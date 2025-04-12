import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import WordExportButton from "./WordExportButton"

export default function PatientForm() {
  const { id } = useParams()
  const [form, setForm] = useState({
    id: "",
    name: "",
    age: "",
    sex: "",
    ageSex: "",
    room: "",
    department: "",
    diagnosis: "",
    history: "",
    RESP: "",
    RESP_new: "",
    CV: "",
    CV_new: "",
    NEU: "",
    NEU_new: "",
    INF: "",
    INF_new: "",
    NEP: "",
    NEP_new: "",
    GIFEN: "",
    GIFEN_new: "",
    ENDO: "",
    ENDO_new: "",
    ETC: "",
    ETC_new: "",
    event: "",
    plan: ""
  })

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patients") || "[]")
    const target = stored.find(p => (p.id || p.name) === id)
    if (target) setForm(target)
  }, [id])

  useEffect(() => {
    setForm(f => ({ ...f, ageSex: `${f.age}/${f.sex}` }))
  }, [form.age, form.sex])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    const patients = JSON.parse(localStorage.getItem("patients") || "[]")
    const updated = patients.filter(p => (p.id || p.name) !== id)
    localStorage.setItem("patients", JSON.stringify([...updated, form]))
    alert("환자 정보가 저장되었습니다!")
  }

  const handleDelete = () => {
    const patients = JSON.parse(localStorage.getItem("patients") || "[]")
    const updated = patients.filter(p => (p.id || p.name) !== id)
    localStorage.setItem("patients", JSON.stringify(updated))
    alert("삭제되었습니다.")
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">환자 정보 입력 / 조회 / 수정</h2>

      <div className="grid grid-cols-6 gap-2">
        <div><label className="text-xs">병실</label><Input name="room" value={form.room} onChange={handleChange} /></div>
        <div><label className="text-xs">진료과</label><Input name="department" value={form.department} onChange={handleChange} /></div>
        <div><label className="text-xs">이름</label><Input name="name" value={form.name} onChange={handleChange} /></div>
        <div><label className="text-xs">등록번호</label><Input name="id" value={form.id} onChange={handleChange} /></div>
        <div><label className="text-xs">나이</label><Input name="age" value={form.age} onChange={handleChange} /></div>
        <div><label className="text-xs">성별</label><Input name="sex" value={form.sex} onChange={handleChange} /></div>
      </div>

      <div><label className="text-xs">진단명</label><Textarea name="diagnosis" value={form.diagnosis} onChange={handleChange} /></div>
      <div><label className="text-xs">주요 병력</label><Textarea name="history" value={form.history} onChange={handleChange} /></div>

      <h3 className="font-semibold mt-4">시스템별 상태 입력</h3>
      {[
        "RESP", "CV", "NEU", "INF", "NEP", "GIFEN", "ENDO", "ETC"
      ].map(key => (
        <div key={key} className="space-y-1">
          <label className="text-xs font-bold">[{key}]</label>
          <Textarea name={key} value={form[key]} onChange={handleChange} placeholder="전체 경과" />
          <Textarea name={`${key}_new`} value={form[`${key}_new`]} onChange={handleChange} placeholder="현재 상태" />
        </div>
      ))}

      <div><label className="text-xs">당직확인사항</label><Textarea name="event" value={form.event} onChange={handleChange} /></div>
      <div><label className="text-xs">당직 시 변동사항</label><Textarea name="plan" value={form.plan} onChange={handleChange} /></div>

      <div className="space-x-2">
        <Button onClick={handleSave}>저장</Button>
        <Button variant="destructive" onClick={handleDelete}>삭제</Button>
        <WordExportButton patient={form} label="전체 경과 내보내기" />
        <WordExportButton patient={form} summaryOnly label="현재 상태 내보내기 (라벨 Bold)" />
      </div>
    </div>
  )
}
