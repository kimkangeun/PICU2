import { saveAs } from "file-saver"
import { Document, Packer, Paragraph, TextRun } from "docx"
export default function WordExportButton({ patient, summaryOnly = false, label = "Word 내보내기" }) {
  const exportToWord = () => {
    let html = `<div style="font-size:9pt; font-family: 'Noto Sans KR', sans-serif;">`

    const titleStyle = "font-weight:bold; font-size:9pt; margin-bottom:4px;"
    const bodyStyle = "font-size:9pt; margin-bottom:8px; white-space:pre-wrap;"

    const writeSection = (title, content) => {
      if (content && content.trim() !== "") {
        html += `<div style='${titleStyle}'>${title}</div>`
        html += `<div style='${bodyStyle}'>${content}</div>`
      }
    }

    writeSection("환자 정보", `${patient.room} ${patient.department} / ${patient.name} (${patient.ageSex})`)
    writeSection("진단명", patient.diagnosis)
    writeSection("주요 병력", patient.history)

    const systems = ["RESP", "CV", "NEU", "INF", "NEP", "GIFEN", "ENDO", "ETC"]
    systems.forEach(sys => {
      const key = summaryOnly ? `${sys}_new` : sys
      const label = `[${sys}]`
      writeSection(label, patient[key])
    })

    writeSection("당직확인사항", patient.event)
    writeSection("당직 시 변동사항", patient.plan)

    html += `</div>`
    const converted = htmlDocx.asBlob(html)
    const filename = `${patient.name || "인계"}_${summaryOnly ? "현재상태" : "전체경과"}.docx`
    saveAs(converted, filename)
  }

  return (
    <button onClick={exportToWord} className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
      {label}
    </button>
  )
}
