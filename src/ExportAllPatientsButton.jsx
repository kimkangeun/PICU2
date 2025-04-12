import htmlDocx from "html-docx-js/dist/html-docx"
import { saveAs } from "file-saver"

export default function ExportAllPatientsButton() {
  const handleExport = () => {
    const patients = JSON.parse(localStorage.getItem("patients") || "[]")
    if (patients.length === 0) return alert("저장된 환자 정보가 없습니다.")

    let content = "<h1 style='font-size:14pt'>전체 환자 인계장</h1>"
    patients.forEach((p, i) => {
      content += `
        <div style='page-break-after: always;'>
          <p style='font-size:10pt'><strong>병실:</strong> ${p.room} / <strong>이름:</strong> ${p.name} / <strong>진료과:</strong> ${p.department} / <strong>나이/성별:</strong> ${p.ageSex}</p>
          <p style='font-size:10pt'><strong>진단명:</strong> ${p.diagnosis}</p>
          <p style='font-size:10pt'><strong>주요 병력:</strong><br /><span style='font-size:9pt'>${p.history}</span></p>

          <p style='font-size:10pt'><strong>[RESP]</strong><br /><span style='font-size:9pt'>${p.RESP}</span></p>
          <p style='font-size:10pt'><strong>[CV]</strong><br /><span style='font-size:9pt'>${p.CV}</span></p>
          <p style='font-size:10pt'><strong>[NEU]</strong><br /><span style='font-size:9pt'>${p.NEU}</span></p>
          <p style='font-size:10pt'><strong>[INF]</strong><br /><span style='font-size:9pt'>${p.INF}</span></p>
          <p style='font-size:10pt'><strong>[NEP]</strong><br /><span style='font-size:9pt'>${p.NEP}</span></p>
          <p style='font-size:10pt'><strong>[GI/FEN]</strong><br /><span style='font-size:9pt'>${p.GIFEN}</span></p>
          <p style='font-size:10pt'><strong>[ENDO]</strong><br /><span style='font-size:9pt'>${p.ENDO}</span></p>
          <p style='font-size:10pt'><strong>[기타]</strong><br /><span style='font-size:9pt'>${p.ETC}</span></p>

          <p style='font-size:10pt'><strong>당직확인사항:</strong><br /><span style='font-size:9pt'>${p.event}</span></p>
          <p style='font-size:10pt'><strong>당직 시 변동사항:</strong><br /><span style='font-size:9pt'>${p.plan}</span></p>
        </div>
      `
    })

    const blob = htmlDocx.asBlob(content)
    saveAs(blob, "전체_환자_인계장.docx")
  }

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      전체 인계장 Word로 내보내기
    </button>
  )
}
