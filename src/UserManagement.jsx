import { useEffect, useState } from "react"

export default function UserManagement() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users") || "[]")
    setUsers(data)
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">👥 등록된 사용자 목록</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">등록된 사용자가 없습니다.</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">이름</th>
              <th className="border p-2">사번</th>
              <th className="border p-2">연락처</th>
              <th className="border p-2">이메일</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.staffId}</td>
                <td className="border p-2">{user.contact}</td>
                <td className="border p-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
