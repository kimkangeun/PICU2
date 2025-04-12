import { saveAs } from "file-saver"
import { Document, Packer, Paragraph, TextRun, PageBreak } from "docx"
import { Button } from "@/components/ui/button"

export default function WordExportAllButton({ ids, summaryOnly = false, label }) {
  const handleExport = () => {
    const stored = JSON.parse(localStorage.getItem("patients") || "[]")
    const selectedPatients = stored.filter(p => ids.includes(p.id))

    const doc = new Document({
      sections: [
        {
          children: selectedPatients.flatMap((p, index) => [
            new Paragraph({
              children: [
                new TextRun({ text: `환자명: ${p.name}`, bold: true }),
                new TextRun({ text: `\t등록번호: ${p.id}` }),
                new TextRun({ text: `\t병실: ${p.room}` }),
                new TextRun({ text: `\t진료과: ${p.department}` }),
                new TextRun({ text: `\t나이/성별: ${p.ageSex}` })
              ],
            }),
            new Paragraph({ text: `진단명: ${p.diagnosis}` }),
            new Paragraph({ text: `주요 병력: ${p.history}` }),
            ...(summaryOnly
              ? [
                  "RESP", "CV", "NEU", "INF", "NEP", "GIFEN", "ENDO", "ETC"
                ].map(key =>
                  new Paragraph({
                    text: `[${key}] ${p[`${key}_new`] || ""}`,
                    spacing: { after: 100 }
                  })
                )
              : [
                  "RESP", "CV", "NEU", "INF", "NEP", "GIFEN", "ENDO", "ETC"
                ].flatMap(key => [
                  new Paragraph({
                    text: `[${key}] 전체 경과: ${p[key] || ""}`
                  }),
                  new Paragraph({
                    text: `[${key}] 현재 상태: ${p[`${key}_new`] || ""}`,
                    spacing: { after: 100 }
                  })
                ])
            ),
            new Paragraph({ text: `당직확인사항: ${p.event}` }),
            new Paragraph({ text: `당직 시 변동사항: ${p.plan}` }),
            ...(index < selectedPatients.length - 1 ? [new Paragraph({ children: [new PageBreak()] })] : [])
          ])
        }
      ]
    })

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, summaryOnly ? "현재상태_일괄인계.docx" : "전체경과_일괄인계.docx")
    })
  }

  return <Button onClick={handleExport}>{label}</Button>
}
