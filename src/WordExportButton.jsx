import { saveAs } from "file-saver"

export default function WordExportButton({ patient, summaryOnly = false, label = "Word 내보내기" }) {
  const handleExport = () => {
    const html = `
      <h2>${patient.room} - ${patient.name} - ${patient.department} - ${patient.ageSex} - ${patient.id}</h2>
      ${summaryOnly ? "" : `
        <p><b>진단명:</b> ${patient.diagnosis}</p>
        <p><b>주요 병력:</b> ${patient.history}</p>
        <p><b>[RESP]</b><br>${patient.RESP}</p>
        <p><b>[CV]</b><br>${patient.CV}</p>
        <p><b>[NEU]</b><br>${patient.NEU}</p>
        <p><b>[INF]</b><br>${patient.INF}</p>
        <p><b>[NEP]</b><br>${patient.NEP}</p>
        <p><b>[GIFEN]</b><br>${patient.GIFEN}</p>
        <p><b>[ENDO]</b><br>${patient.ENDO}</p>
        <p><b>[ETC]</b><br>${patient.ETC}</p>
      `}
      <p><b>당직확인사항:</b><br>${patient.event}</p>
      <p><b>당직 시 변동사항:</b><br>${patient.plan}</p>
    `

    const blob = new Blob([`<html><body>${html}</body></html>`], {
      type: "application/msword",
    })

    const filename = summaryOnly ? `${patient.name}_현재상태.doc` : `${patient.name}_전체경과.doc`
    saveAs(blob, filename)
  }

  return (
    <button onClick={handleExport} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm">
      {label}
    </button>
  )
}
