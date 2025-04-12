import { useEffect, useState } from "react"
import WordExportButton from "./WordExportButton"
import ExportAllPatientsButton from "./ExportAllPatientsButton" // ✅ 상단 버튼 import

export default function PatientSummary() {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("patients") || "[]")
    setPatients(data)
  }, [])

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">📝 당직 요약 페이지</h2>
        <ExportAllPatientsButton /> {/* ✅ 상단에 위치 */}
      </div>

      {patients.length === 0 ? (
        <p className="text-gray-500">저장된 환자 정보가 없습니다.</p>
      ) : (
        patients.map((p, i) => (
          <div key={i} className="border border-gray-300 rounded-2xl p-4 shadow-sm bg-white">
            <div className="font-semibold">
              {p.room} | {p.name} | {p.department} | {p.ageSex}
            </div>
            <hr className="my-2" />
            <div className="mb-2">
              <strong>당직확인사항:</strong>
              <div className="whitespace-pre-wrap mt-1 text-sm">{p.event || "-"}</div>
            </div>
            <div>
              <strong>당직 시 변동사항:</strong>
              <div className="whitespace-pre-wrap mt-1 text-sm">{p.plan || "-"}</div>
            </div>
            <WordExportButton patient={p} />
          </div>
        ))
      )}
    </div>
  )
}
