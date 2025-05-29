import { NextResponse } from "next/server"

export async function GET() {
  const htmlContent = `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nabídka práce - ZOD Borovany</title>
    <style>
        @page {
            size: A4;
            margin: 20mm;
        }
        @media print {
            body { 
                margin: 0;
                padding: 0;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
        body { 
            font-family: Arial, sans-serif; 
            font-size: 14px;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: white;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #16a34a;
            padding-bottom: 20px;
        }
        .logo {
            width: 120px;
            height: 80px;
            background: #16a34a;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 18px;
        }
        .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #16a34a;
            margin-bottom: 10px;
        }
        .website {
            font-size: 16px;
            color: #666;
            margin-bottom: 30px;
        }
        .job-title {
            font-size: 28px;
            font-weight: bold;
            color: #333;
            text-align: center;
            margin: 30px 0;
            background: #f0f9ff;
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #16a34a;
        }
        .requirements {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .requirements h3 {
            color: #16a34a;
            margin-top: 0;
            font-size: 18px;
        }
        .requirements ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .requirements li {
            margin: 8px 0;
            font-size: 16px;
        }
        .benefits {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .benefits h3 {
            color: #16a34a;
            margin-top: 0;
            font-size: 18px;
        }
        .salary {
            font-size: 20px;
            font-weight: bold;
            color: #16a34a;
            text-align: center;
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            border: 2px solid #16a34a;
        }
        .contact {
            background: #16a34a;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
        }
        .contact h3 {
            margin-top: 0;
            font-size: 18px;
        }
        .contact-info {
            font-size: 16px;
            line-height: 1.8;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #16a34a;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            ZOD<br>🌾
        </div>
        <div class="company-name">ZOD BOROVANY</div>
        <div class="website">www.zodborovany.cz</div>
    </div>

    <div class="job-title">
        Přijmeme ošetřovatele/ku dojnic
    </div>

    <div class="requirements">
        <h3>📋 Požadujeme:</h3>
        <ul>
            <li>zájem o práci v živočišné výrobě</li>
            <li>zodpovědný přístup k práci</li>
            <li>spolehlivost a pečlivost</li>
            <li>ochotu učit se novým postupům</li>
        </ul>
    </div>

    <div class="benefits">
        <h3>✅ Nabízíme:</h3>
        <ul>
            <li><strong>nástup možný ihned</strong></li>
            <li>stabilní zaměstnání v moderním zemědělském podniku</li>
            <li>roční prémie za dobré výsledky</li>
            <li>dotované závodní stravování</li>
            <li>příjemný pracovní kolektiv</li>
            <li>možnost profesního růstu</li>
        </ul>
        
        <div class="salary">
            💰 Měsíční mzda: 32 000 – 38 000 Kč
        </div>
    </div>

    <div class="contact">
        <h3>📞 Kontakt pro zájemce:</h3>
        <div class="contact-info">
            <strong>Ing. Ondřej Kubala</strong><br>
            Hlavní zootechnik<br><br>
            📱 Tel.: 778 474 530<br>
            📧 Email: info@zodborovany.cz<br><br>
            📍 Vodárenská 97, 373 12 Borovany
        </div>
    </div>

    <div class="footer">
        <p><strong>ZOD Borovany</strong> - Moderní zemědělské družstvo s tradicí</p>
        <p>Těšíme se na vaši odpověď!</p>
    </div>
</body>
</html>
  `

  return new NextResponse(htmlContent, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  })
}
