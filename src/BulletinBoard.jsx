// 게시판 기능 + 페이지네이션 (20개씩) + 파일 업로드 + 각 게시판 분리 가능
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useLocation, useNavigate } from "react-router-dom"

export default function BulletinBoard() {
  const location = useLocation()
  const navigate = useNavigate()
  const defaultCategory = decodeURIComponent(location.pathname.split("/").pop() || "공지사항")

  const [posts, setPosts] = useState([])
  const [form, setForm] = useState({ category: defaultCategory, title: "", content: "", file: null, date: "", editIndex: null })
  const [commentText, setCommentText] = useState("")
  const [editingCommentIndex, setEditingCommentIndex] = useState(null)
  const [selectedPostIndex, setSelectedPostIndex] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 20
  const categories = ["공지사항", "회의록", "환자진료지침", "연구자료"]

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("posts") || "[]")
    setPosts(data)
  }, [])

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({ ...form, file: e.target.files[0] })
    } else {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  }

  const handleSave = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const reader = new FileReader()

    reader.onloadend = () => {
      const fileUrl = form.file ? reader.result : null
      const postData = {
        ...form,
        file: fileUrl,
        date: new Date().toLocaleString(),
        writer: currentUser?.name || "익명",
        comments: [],
        editIndex: null
      }

      const updated = form.editIndex !== null
        ? posts.map((p, i) => i === form.editIndex ? postData : p)
        : [...posts, postData]

      setPosts(updated)
      localStorage.setItem("posts", JSON.stringify(updated))
      setForm({ category: defaultCategory, title: "", content: "", file: null, date: "", editIndex: null })
    }

    if (form.file) {
      reader.readAsDataURL(form.file)
    } else {
      reader.onloadend()
    }
  }

  const handleEdit = (index) => {
    setForm({ ...posts[index], editIndex: index })
  }

  const handleDelete = (index) => {
    const updated = posts.filter((_, i) => i !== index)
    setPosts(updated)
    localStorage.setItem("posts", JSON.stringify(updated))
  }

  const handleAddComment = (postIndex) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const comment = { name: currentUser?.name || "익명", text: commentText, date: new Date().toLocaleString() }
    const updated = posts.map((p, i) => i === postIndex ? { ...p, comments: [...(p.comments || []), comment] } : p)
    setPosts(updated)
    localStorage.setItem("posts", JSON.stringify(updated))
    setCommentText("")
  }

  const handleDeleteComment = (postIndex, commentIndex) => {
    const updated = posts.map((p, i) => {
      if (i !== postIndex) return p
      const newComments = p.comments.filter((_, ci) => ci !== commentIndex)
      return { ...p, comments: newComments }
    })
    setPosts(updated)
    localStorage.setItem("posts", JSON.stringify(updated))
  }

  const handleEditComment = (postIndex, commentIndex) => {
    const target = posts[postIndex].comments[commentIndex]
    setCommentText(target.text)
    setEditingCommentIndex({ postIndex, commentIndex })
  }

  const handleUpdateComment = () => {
    const { postIndex, commentIndex } = editingCommentIndex
    const updated = posts.map((p, i) => {
      if (i !== postIndex) return p
      const newComments = p.comments.map((c, ci) => ci === commentIndex ? { ...c, text: commentText, date: new Date().toLocaleString() } : c)
      return { ...p, comments: newComments }
    })
    setPosts(updated)
    localStorage.setItem("posts", JSON.stringify(updated))
    setEditingCommentIndex(null)
    setCommentText("")
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const filteredPosts = posts.filter(p => p.category === defaultCategory)
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold">📌 {defaultCategory}</h2>

      {/* 글쓰기 */}
      <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
        <Input placeholder="제목" name="title" value={form.title} onChange={handleChange} />
        <Textarea placeholder="내용" name="content" value={form.content} onChange={handleChange} />
        <input type="file" name="file" accept="image/*,.pdf" onChange={handleChange} />
        <Button onClick={handleSave}>{form.editIndex !== null ? "수정" : "등록"}</Button>
      </div>

      {/* 게시물 목록 */}
      {paginatedPosts.map((p, idx) => (
        <div key={idx} className="border p-3 rounded bg-white shadow space-y-2">
          <div className="text-sm text-gray-600">{p.date} • 작성자: {p.writer || "익명"}</div>
          <div className="font-semibold">{p.title}</div>
          <div className="whitespace-pre-wrap text-sm">{p.content}</div>
          {p.file && (
            <a href={p.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm underline">첨부파일 보기</a>
          )}
          <div className="space-x-2">
            <Button size="sm" onClick={() => handleEdit(posts.indexOf(p))}>수정</Button>
            <Button size="sm" variant="destructive" onClick={() => handleDelete(posts.indexOf(p))}>삭제</Button>
          </div>
          <div className="mt-4 space-y-1">
            <strong className="text-sm">💬 댓글</strong>
            {(p.comments || []).map((c, i) => (
              <div key={i} className="text-sm border rounded p-2 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{c.name}</span> ({c.date})<br />
                    {c.text}
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" onClick={() => handleEditComment(posts.indexOf(p), i)}>수정</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteComment(posts.indexOf(p), i)}>삭제</Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex space-x-2 mt-2">
              <Input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="댓글 입력" />
              {editingCommentIndex ? (
                <Button onClick={handleUpdateComment}>수정 완료</Button>
              ) : (
                <Button onClick={() => handleAddComment(posts.indexOf(p))}>등록</Button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* 페이지네이션 */}
      <div className="flex justify-center space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <Button key={i} variant={currentPage === i + 1 ? "default" : "outline"} size="sm" onClick={() => paginate(i + 1)}>
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}
