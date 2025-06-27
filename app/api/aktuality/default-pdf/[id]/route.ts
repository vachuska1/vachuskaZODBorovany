import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  
  // Create a simple PDF with the ID in the content
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 24 Tf
100 700 Td
(ZOD BOROVANY - AKTUALITA ${id}) Tj
0 -50 Td
/F1 18 Tf
(Připravujeme pro vás novou nabídku) Tj
0 -40 Td
/F1 12 Tf
(• nové pracovní příležitosti) Tj
0 -20 Td
• aktuální informace) Tj
0 -20 Td
• a další zajímavosti) Tj
0 -40 Td
(Kontakt: Ing. Ondřej Kubala) Tj
0 -20 Td
(tel.: 778 474 530) Tj
0 -20 Td
(email: info@zodborovany.cz) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000526 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
623
%%EOF`

  return new Response(pdfContent, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="aktualita-${id}.pdf"`,
    },
  })
}
