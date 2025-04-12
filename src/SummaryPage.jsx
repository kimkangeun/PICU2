import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import WordExportAllButton from "./WordExportAllButton"
import { useNavigate } from "react-router-dom"

export default function SummaryPage() {
  const [patients, setPatients] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) navigate("/login")

    const stored = JSON.parse(localStorage.getItem("patients") || "[]")
    if (!stored || stored.length === 0) {
      const sample = [
        {
          id: "101",
          name: "김하린",
          age: "6",
          sex: "F",
          ageSex: "6/F",
          room: "3201",
          department: "소아심장",
          diagnosis: "선천성 심질환",
          history: "2024년 10월 Glenn 수술",
          RESP: "흡입 산소 유지 중",
          RESP_new: "산소 필요 없음",
          CV: "HR 안정, 혈압 유지",
          CV_new: "MAP 65 이상 유지",
          NEU: "의식 명료",
          NEU_new: "동공 반응 정상",
          INF: "무감염 상태",
          INF_new: "WBC 정상범위",
          NEP: "소변 배출 양호",
          NEP_new: "일일 소변량 1200ml",
          GIFEN: "식이 가능",
          GIFEN_new: "경구 식이 진행 중",
          ENDO: "혈당 정기 측정",
          ENDO_new: "혈당 100~120",
          ETC: "",
          ETC_new: "",
          event: "혈압 측정 정확도 확인",
          plan: "내일 CXR 예정"
        }
      ]
      localStorage.setItem("patients", JSON.stringify(sample))
      setPatients(sample)
      setSelectedIds(sample.map(p => p.id))
    } else {
      setPatients(stored)
      setSelectedIds(stored.map(p => p.id))
    }
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
              <WordExportAllButton ids={selectedIds} summaryOnly label="현재 상태 일괄 내보내기" />
              <WordExportAllButton ids={selectedIds} summaryOnly={false} label="전체 경과 일괄 내보내기" />
              <Button onClick={() => navigate("/")} className="bg-[#00754B] hover:bg-[#005F3E] text-white">🏠 홈으로</Button>
            </div>
          </div>

          {patients.map((p, i) => (
            <Card key={i} className="rounded-2xl shadow p-4">
              <CardContent className="space-y-2">
                <div className="text-sm font-semibold">
                  {p.room} - {p.name} - {p.department} - {p.ageSex} - {p.id}
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
