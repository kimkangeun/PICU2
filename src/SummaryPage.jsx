import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { saveAs } from "file-saver"
import { useNavigate } from "react-router-dom"

export default function SummaryPage() {
  const [patients, setPatients] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) navigate("/login")

    const stored = JSON.parse(localStorage.getItem("patients") || "[]")
    setPatients(stored)
    setSelectedIds(stored.map(p => p.id))
  }, [navigate])

  const handleChange = (id, field, value) => {
    const updated = patients.map(p => {
      if ((p.id || p.name) === id) {
        return { ...p, [field]: value }
      }
      return p
    })
    setPatients(updated)
    localStorage.setItem("patients", JSON.stringify(updated))
  }

  const handleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const exportToDoc = (summaryOnly = true) => {
    const selectedPatients = patients.filter(p => selectedIds.includes(p.id))
    const html = selectedPatients.map(p => `
      <h2>${p.room} - ${p.name} - ${p.department} - ${p.ageSex} - ${p.id}</h2>
      ${summaryOnly ? "" : `
        <p><b>진단명:</b><br>${p.diagnosis}</p>
        <p><b>주요 병력:</b><br>${p.history}</p>
      `}
      ${["RESP", "CV", "NEU", "INF", "NEP", "GIFEN", "ENDO", "ETC"].map(key =>
        `<p><b>[${key}]</b><br>${p[`${key}_new`]}</p>`
      ).join("")}
      <p><b>당직확인사항:</b><br>${p.event}</p>
      <p><b>당직 시 변동사항:</b><br>${p.plan}</p>
      <br style="page-break-after: always;" />
    `).join("\n")

    const blob = new Blob([`<html><body>${html}</body></html>`], { type: "application/msword" })
    saveAs(blob, summaryOnly ? "현재상태_일괄.doc" : "전체경과_일괄.doc")
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-[#E6F4EF] p-4 text-center text-lg font-bold border-b text-[#005792]">
        AMC PICU2 전담간호사 Workspace
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r p-4 overflow-y-auto bg-white">
          <h3 className="text-sm font-semibold mb-2 text-[#005792]">📋 메뉴</h3>
          <Button className="mb-2 w-full bg-[#00754B] hover:bg-[#005F3E] text-white" onClick={() => navigate("/form")}>+ 환자 입력</Button>
          <Button className="w-full bg-[#00754B] hover:bg-[#005F3E] text-white" onClick={() => navigate("/summary")}>📄 당직확인 요약</Button>
        </aside>

        <main className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#005792]">📄 당직확인 요약</h2>
            <div className="space-x-2">
              <Button onClick={() => exportToDoc(true)} className="bg-blue-600 text-white">현재 상태 일괄 내보내기</Button>
              <Button onClick={() => exportToDoc(false)} className="bg-gray-600 text-white">전체 경과 일괄 내보내기</Button>
              <Button onClick={() => navigate("/")} className="bg-[#00754B] hover:bg-[#005F3E] text-white">🏠 홈으로</Button>
            </div>
          </div>

          {patients.map((p, i) => (
            <Card key={i} className="rounded-2xl shadow p-4">
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">
                    <input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => handleSelect(p.id)} className="mr-2" />
                    {p.room} - {p.name} - {p.department} - {p.ageSex} - {p.id}
                  </div>
                </div>
                <hr />
                <div>
                  <label className="text-xs text-gray-600">당직확인사항</label>
                  <Textarea
                    value={p.event || ""}
                    onChange={e => handleChange(p.id || p.name, "event", e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">당직 시 변동사항</label>
                  <Textarea
                    value={p.plan || ""}
                    onChange={e => handleChange(p.id || p.name, "plan", e.target.value)}
                    className="text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </main>
      </div>
    </div>
  )
}

