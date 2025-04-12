import { saveAs } from "file-saver"
import htmlDocx from "html-docx-js"
import { Button } from "@/components/ui/button"

export default function WordExportButton({ patient, summaryOnly = false, label = "Word로 내보내기" }) {
  const generateHTML = () => {
    let html = `<h2>${patient.room} - ${patient.name} (${patient.ageSex})</h2>`
    html += `<p><strong>등록번호:</strong> ${patient.id}</p>`
    html += `<p><strong>진료과:</strong> ${patient.department}</p>`
    html += `<p><strong>진단명:</strong> ${patient.diagnosis}</p>`
    html += `<p><strong>주요 병력:</strong><br>${patient.history}</p>`

    const keys = ["RESP", "CV", "NEU", "INF", "NEP", "GIFEN", "ENDO", "ETC"]
    keys.forEach(key => {
      const value = summaryOnly ? patient[`${key}_new`] : patient[key]
      if (value) {
        html += `<p><strong>[${key}]</strong><br>${value}</p>`
      }
    })

    html += `<p><strong>당직확인사항:</strong><br>${patient.event}</p>`
    html += `<p><strong>당직 시 변동사항:</strong><br>${patient.plan}</p>`

    return html
  }

  const handleExport = () => {
    const content = generateHTML()
    const converted = htmlDocx.asBlob(content, { orientation: "portrait" })
    const filename = `${patient.room}_${patient.name}_${summaryOnly ? "요약" : "전체"}.docx`
    saveAs(converted, filename)
  }

  return (
    <Button onClick={handleExport} className="text-sm bg-[#005792] hover:bg-[#004066] text-white">
      {label}
    </Button>
  )
}
