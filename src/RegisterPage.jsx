import "./index.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    id: "",
    phone: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    users.push(form)
    localStorage.setItem("users", JSON.stringify(users))
    alert("회원가입이 완료되었습니다.")
    navigate("/login")
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F4EF] to-[#DCEFF0] font-sans">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-[#C6E5DA] bg-white">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-center text-2xl font-bold text-[#005792] mb-2">
            PICU2 전담간호사 회원가입
          </h1>
          <p className="text-sm text-center text-gray-500">
            환자 인계 시스템을 함께 사용하기 위해 정보를 입력해주세요.
          </p>
          <Input placeholder="이름" name="name" value={form.name} onChange={handleChange} />
          <Input placeholder="사번" name="id" value={form.id} onChange={handleChange} />
          <Input placeholder="연락처" name="phone" value={form.phone} onChange={handleChange} />
          <Input placeholder="이메일" name="email" value={form.email} onChange={handleChange} />
          <Input placeholder="비밀번호" type="password" name="password" value={form.password} onChange={handleChange} />
          <Button onClick={handleRegister} className="w-full bg-[#00754B] hover:bg-[#005F3E] text-white">
            회원가입 완료
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
