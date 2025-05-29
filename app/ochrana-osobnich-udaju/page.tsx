"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Shield, Mail } from "lucide-react"

export default function PrivacyPolicyPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Zpět na kontakty
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Zásady ochrany osobních údajů</h1>
        </div>

        <div className="space-y-6">
          {/* Data Controller */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Správce osobních údajů</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Správcem Vašich osobních údajů je společnost ZOD Borovany, IČ: 00109207, se{" "}
                <span className="font-medium">sídlem Vodárenská 97, 373 12 Borovany</span>.
              </p>
            </CardContent>
          </Card>

          {/* Purpose */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Účel zpracování osobních údajů</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Vaše osobní údaje zpracováváme za účelem vyřízení Vašeho dotazu zaslaného prostřednictvím kontaktního
                formuláře na našich webových stránkách.
              </p>
            </CardContent>
          </Card>

          {/* Processing Period */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Doba zpracování</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Osobní údaje zpracováváme po dobu nezbytnou k vyřízení Vašeho dotazu, maximálně však po dobu 1 roku od
                jeho odeslání, pokud se s námi nedohodneme na delší době.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Vaše práva</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  V souvislosti se zpracováním Vašich osobních údajů máte následující práva:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Právo na přístup k osobním údajům</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Právo na opravu nepřesných údajů</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Právo na výmaz (být zapomenut)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Právo na omezení zpracování</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Právo na přenositelnost údajů</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Právo vznést námitku</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Právo podat stížnost u dozorového úřadu (Úřad pro ochranu osobních údajů)</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Kontaktní údaje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                V případě dotazů ohledně zpracování Vašich osobních údajů nás můžete kontaktovat na e-mailové adrese:{" "}
                <a
                  href="mailto:info@zodborovany.cz"
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  info@zodborovany.cz
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Changes to Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Změny v zásadách ochrany osobních údajů</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Tyto zásady ochrany osobních údajů mohou být aktualizovány. Aktuální verze je vždy zveřejněna na těchto
                webových stránkách.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">Poslední aktualizace: {new Date().toLocaleDateString("cs-CZ")}</p>
        </div>
      </div>
    </div>
  )
}
