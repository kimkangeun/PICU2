import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Sidebar() {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("patients") || "[]")
    setPatients(data)
  }, [])

  return (
    <div className="w-64 p-4 border-r h-screen bg-white space-y-6 overflow-y-auto">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-600">🏥 환자 목록</h3>
        {patients.length === 0 ? (
          <p className="text-xs text-gray-400">저장된 환자 없음</p>
        ) : (
          patients.map((p, i) => (
            <Link
              key={i}
              to={`/patient/${p.id || p.name}`}
              className="text-xs block truncate hover:text-blue-600"
            >
              {p.room}-{p.department}-{p.name}-{p.id || "등록번호"}-{p.ageSex}
            </Link>
          ))
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-600">📋 인계 도구</h3>
        <Link to="/summary" className="block hover:text-blue-600">📄 당직확인요약</Link>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-600">📝 게시판</h3>
        <Link to="/bulletin/전체보기" className="block hover:text-blue-600">전체보기</Link>
        <Link to="/bulletin/공지사항" className="block hover:text-blue-600">공지사항</Link>
        <Link to="/bulletin/회의록" className="block hover:text-blue-600">회의록</Link>
        <Link to="/bulletin/환자진료지침" className="block hover:text-blue-600">환자진료지침</Link>
        <Link to="/bulletin/연구자료" className="block hover:text-blue-600">연구자료</Link>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-600">👤 계정</h3>
        <Link to="/register" className="block hover:text-blue-600">회원가입</Link>
        <Link to="/login" className="block hover:text-blue-600">로그인</Link>
      </div>
    </div>
  )
}
