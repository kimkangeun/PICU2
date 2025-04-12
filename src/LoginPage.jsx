import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const found = users.find(u => u.email === email && u.password === password)
    if (found) {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userName", found.name)
      navigate("/")
    } else {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F4EF] to-[#DCEFF0]">
      <Card className="w-full max-w-sm shadow-xl rounded-2xl border border-[#C6E5DA] bg-white">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-center text-2xl font-bold text-[#005792] mb-2">
            환영합니다. PICU2 전담간호사님.
          </h1>
          <p className="text-sm text-center text-gray-500">
            안전하고 간편한 인계를 위해 시작해볼까요?
          </p>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-white"
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-white"
          />
          <Button onClick={handleLogin} className="w-full bg-[#00754B] hover:bg-[#005F3E] text-white">
            로그인
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
