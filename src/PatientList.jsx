import { useEffect, useState } from "react"
import WordExportAllButton from "./WordExportAllButton"

export default function PatientList() {
  const [patients, setPatients] = useState([])
  const [selectedIds, setSelectedIds] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patients") || "[]")
    setPatients(stored)
  }, [])

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">환자 목록</h2>
      <div className="flex gap-2">
        <WordExportAllButton ids={selectedIds} summaryOnly={false} label="전체 경과 일괄 내보내기" />
        <WordExportAllButton ids={selectedIds} summaryOnly={true} label="현재 상태 일괄 내보내기" />
      </div>
      <ul className="divide-y">
        {patients.map(p => (
          <li key={p.id || p.name} className="py-2 flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedIds.includes(p.id)}
              onChange={() => toggleSelect(p.id)}
            />
            <span className="text-sm">
              {p.room} - {p.department} - {p.name} - {p.id} - {p.ageSex}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
