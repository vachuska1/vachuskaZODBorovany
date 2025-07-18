"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language = "cs" | "en" | "de"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  cs: {
    home: "Domů",
    menu: "Jídelní lístek",
    news: "Aktuality",
    vos: "VOS",
    vosTitle: "VOS - Interní oznamovací systém",
    documents: "Dokumenty",
    contact: "Kontakt",
    navigation: "Navigace",
    gallery: "Fotogalerie",
    workOffers: "Nabídka pracovních pozic",
    statutes: "Stanovy",
    grants: "Dotační tituly",
    internalReporting: "Vnitřní oznamovací systém",
    contactUs: "Kontaktujte nás",
    name: "Jméno",
    email: "Email",
    message: "Zpráva",
    send: "Odeslat",
    week1: "Tento týden",
    week2: "Příští týden",
    thisWeek: "Jídelní lístek 1",
    nextWeek: "Jídelní lístek 2",
    print: "Tisk",
    whatWeDo: "ČÍM SE ZABÝVÁME",
    plantProduction: "Rostlinná výroba",
    animalProduction: "Živočišná výroba",
    companyCanteen: "Závodní kuchyně",
    plantProductionText1:
      "Naše družstvo obhospodařuje celkem 2580 hektarů zemědělské půdy, z toho tvoří 1570 hektarů orná půda a 1010 hektarů louky a pastviny. Družstvo se specializuje na výrobu obilovin, především pšenice, ječmene a tritikale.",
    plantProductionText2:
      "Vzhledem k rozsáhlé živočišné výrobě se zaměřujeme na pěstování krmných plodin, hlavně jetelotrav a kukuřice na siláž. Tržní plodinou je řepka olejná, kterou pěstujeme na 240 hektarech půdy.",
    animalProductionText1:
      "Družstvo se zabývá chovem skotu a drůbeže. Hlavní činností je výroba mléka, v moderních stájích chováme 600 ks dojnic s roční produkcí 5 mil. litrů. Na pastvinách máme 200 krav bez tržní produkce mléka.",
    animalProductionText2:
      "Ve čtyřech odchovnách realizujeme výkrm kuřat. V areálu Borovany provozujeme malou porážku drůbeže, díky které můžeme zájemcům nabídnout kuchaná chlazená kuřata přímo od chovatele.",
    companyCanteenText1:
      "Provozujeme závodní kuchyni, která slouží jak zaměstnancům, tak široké veřejnosti. Zaměřujeme se na tradiční českou kuchyni. <strong>Cena oběda je 115,- Kč včetně polévky.</strong> Oběd je možné konzumovat v závodní jídelně či si ho ve vlastních nádobách odnést s sebou.",
    companyCanteenText2:
      "V závodní kuchyni také vyrábíme houskové knedlíky, které dodáváme do místních restaurací. <strong>Cena 1 ks knedlíku o hmotnosti 600g je 40,- Kč.</strong>",
    followUs: "Sledujte nás",
    chairmanBoard: "Předseda představenstva",
    viceChairmanBoard: "Místopředseda představenstva",
    economist: "Ekonomka",
    chiefZootechnician: "Hlavní zootechnik",
    chiefMechanizer: "Hlavní mechanizátor",
    landManagement: "Správa pozemků",
    kitchenManager: "Vedoucí závodní kuchyně",
    writeToUs: "Napište nám",
    nameAndSurname: "Jméno a příjmení",
    phone: "Telefon",
    whereToFindUs: "Kde nás najdete",
    showLargerMap: "Zobrazit větší mapu",
    sendingMessage: "Odesílání...",
    sendMessage: "Odeslat zprávu",
    messageSuccessfullySent: "Zpráva byla úspěšně odeslána",
    errorSendingMessage: "Chyba při odesílání zprávy",
    gdprConsent: "Odesláním formuláře souhlasíte se",
    gdprLink: "zpracováním osobních údajů",
    gdprPurpose: "pro účely vyřízení vašeho dotazu.",
    contacts: "KONTAKTY",
    // Nové překlady
    farmAreas: "Areály farmy",
    idNumber: "IČ",
    vatId: "DIČ",
    modernAgricultural: "Moderní zemědělské družstvo s tradicí",
    address: "Adresa",
    dataBox: "Datová schránka",
    openingHours: "Otevírací doba",
    weekdays: "Po–Pá",
    weekend: "So–Ne: zavřeno",
    allRightsReserved: "Všechna práva vyhrazena",
    mainNavigation: "Hlavní navigace",
    aktualita1: "Aktualita 1",
    aktualita2: "Aktualita 2",
    aktualita3: "Aktualita 3",
    aktualita4: "Aktualita 4",
    grantTitle1: "Dotační titul 1",
    grantTitle2: "Dotační titul 2",
    grantTitle3: "Dotační titul 3",
    grantTitle4: "Dotační titul 4",
    grantTitle5: "Dotační titul 5",
    grantTitle6: "Dotační titul 6",
    // GDPR stránka
    backToContacts: "Zpět na kontakty",
    privacyPolicy: "Zásady ochrany osobních údajů",
    dataController: "Správce osobních údajů",
    dataControllerText:
      "Správcem Vašich osobních údajů je společnost Zemědělské obchodní družstvo Borovany, IČO: 00109207, se sídlem Vodárenská 97, 373 12 Borovany.",
    processingPurpose: "Účel zpracování osobních údajů",
    processingPurposeText:
      "Vaše osobní údaje zpracováváme za účelem vyřízení Vašeho dotazu zaslaného prostřednictvím kontaktního formuláře na našich webových stránkách.",
    processingPeriod: "Doba zpracování",
    processingPeriodText:
      "Osobní údaje zpracováváme po dobu nezbytnou k vyřízení Vašeho dotazu, maximálně však po dobu 1 roku od jeho odeslání, pokud se s námi nedohodneme na delší době.",
    yourRights: "Vaše práva",
    yourRightsText: "V souvislosti se zpracováním Vašich osobních údajů máte následující práva:",
    rightAccess: "Právo na přístup k osobním údajům",
    rightRectification: "Právo na opravu nepřesných údajů",
    rightErasure: "Právo na výmaz (být zapomenut)",
    rightRestriction: "Právo na omezení zpracování",
    rightPortability: "Právo na přenositelnost údajů",
    rightObject: "Právo vznést námitku",
    rightComplaint: "Právo podat stížnost u dozorového úřadu (Úřad pro ochranu osobních údajů)",
    contactInformation: "Kontaktní údaje",
    contactInformationText:
      "V případě dotazů ohledně zpracování Vašich osobních údajů nás můžete kontaktovat na e-mailové adrese:",
    policyChanges: "Změny v zásadách ochrany osobních údajů",
    policyChangesText:
      "Tyto zásady ochrany osobních údajů mohou být aktualizovány. Aktuální verze je vždy zveřejněna na těchto webových stránkách.",
  },
  en: {
    home: "Home",
    menu: "Menu",
    news: "News",
    vos: "IRS",
    vosTitle: "IRS - Internal Reporting System",
    documents: "Documents",
    contact: "Contact",
    navigation: "Navigation",
    gallery: "Gallery",
    workOffers: "Job Offers",
    statutes: "Statutes",
    grants: "Grant titles",
    internalReporting: "Internal Reporting System",
    contactUs: "Contact Us",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    week1: "This week",
    week2: "Next week",
    thisWeek: "Menu 1",
    nextWeek: "Menu 2",
    print: "Print",
    whatWeDo: "WHAT WE DO",
    farmAreas: "Farm Areas",
    idNumber: "ID",
    vatId: "VAT ID",
    plantProduction: "Plant Production",
    animalProduction: "Animal Production",
    companyCanteen: "Company Canteen",
    plantProductionText1:
      "Our cooperative manages a total of 2580 hectares of agricultural land, of which 1570 hectares are arable land and 1010 hectares are meadows and pastures. The cooperative specializes in the production of cereals, mainly wheat, barley and triticale.",
    plantProductionText2:
      "Due to extensive livestock production, we focus on growing feed crops, mainly clover-grass and corn for silage. The market crop is rapeseed, which we grow on 240 hectares of land.",
    animalProductionText1:
      "The cooperative is engaged in cattle and poultry breeding. The main activity is milk production, in modern stables we keep 600 dairy cows with an annual production of 5 million liters. We have 200 cows on pastures without commercial milk production.",
    animalProductionText2:
      "We carry out chicken fattening in four rearing facilities. In the Borovany area, we operate a small poultry slaughterhouse, thanks to which we can offer interested parties dressed chicken directly from the breeder.",
    companyCanteenText1:
      "We operate a company canteen that serves both employees and the general public. We focus on traditional Czech cuisine. <strong>The price of lunch is 115 CZK including soup.</strong> Lunch can be eaten in the canteen or taken away in your own containers.",
    companyCanteenText2:
      "In the company kitchen, we also produce bread dumplings, which we supply to local restaurants. <strong>The price of 1 piece of dumpling weighing 600g is 40 CZK.</strong>",
    followUs: "Follow Us",
    chairmanBoard: "Chairman of the Board",
    viceChairmanBoard: "Vice Chairman of the Board",
    economist: "Economist",
    chiefZootechnician: "Animal Production Manager",
    chiefMechanizer: "Chief Mechanist",
    landManagement: "Land Manager",
    kitchenManager: "Head Chef",
    writeToUs: "Write to Us",
    nameAndSurname: "Name and Surname",
    phone: "Phone",
    whereToFindUs: "Where to Find Us",
    showLargerMap: "Show Larger Map",
    sendingMessage: "Sending...",
    sendMessage: "Send Message",
    messageSuccessfullySent: "Message was successfully sent",
    errorSendingMessage: "Error sending message",
    gdprConsent: "By submitting the form you agree to",
    gdprLink: "personal data processing",
    gdprPurpose: "for the purpose of handling your inquiry.",
    contacts: "CONTACTS",
    modernAgricultural: "Modern agricultural cooperative with tradition",
    address: "Address",
    dataBox: "Data box",
    openingHours: "Opening hours",
    weekdays: "Mon–Fri",
    weekend: "Sat–Sun: closed",
    allRightsReserved: "All rights reserved",
    mainNavigation: "Main Navigation",
    aktualita1: "News 1",
    aktualita2: "News 2",
    aktualita3: "News 3",
    aktualita4: "News 4",
    grantTitle1: "Grant title 1",
    grantTitle2: "Grant title 2",
    grantTitle3: "Grant title 3",
    grantTitle4: "Grant title 4",
    grantTitle5: "Grant title 5",
    grantTitle6: "Grant title 6",
    // GDPR stránka
    backToContacts: "Back to contacts",
    privacyPolicy: "Privacy Policy",
    dataController: "Data Controller",
    dataControllerText:
      "The data controller of your personal data is Zemědělské obchodní družstvo Borovany, IČO: 00109207, with registered office at Vodárenská 97, 373 12 Borovany.",
    processingPurpose: "Purpose of Personal Data Processing",
    processingPurposeText:
      "We process your personal data for the purpose of handling your inquiry sent through the contact form on our website.",
    processingPeriod: "Processing Period",
    processingPeriodText:
      "We process personal data for the period necessary to handle your inquiry, but for a maximum of 1 year from its submission, unless we agree on a longer period.",
    yourRights: "Your Rights",
    yourRightsText: "In connection with the processing of your personal data, you have the following rights:",
    rightAccess: "Right of access to personal data",
    rightRectification: "Right to rectification of inaccurate data",
    rightErasure: "Right to erasure (right to be forgotten)",
    rightRestriction: "Right to restriction of processing",
    rightPortability: "Right to data portability",
    rightObject: "Right to object",
    rightComplaint: "Right to lodge a complaint with a supervisory authority (Office for Personal Data Protection)",
    contactInformation: "Contact Information",
    contactInformationText:
      "If you have any questions regarding the processing of your personal data, you can contact us at the email address:",
    policyChanges: "Changes to Privacy Policy",
    policyChangesText: "This privacy policy may be updated. The current version is always published on this website.",
  },
  de: {
    home: "Startseite",
    menu: "Speisekarte",
    news: "Neuigkeiten",
    vos: "IM",
    vosTitle: "IM - Internes Meldesystem",
    documents: "Dokumente",
    contact: "Kontakt",
    navigation: "Navigation",
    gallery: "Galerie",
    workOffers: "Stellenangebote",
    statutes: "Satzung",
    grants: "Agrarförderungen",
    internalReporting: "Internes Meldesystem",
    contactUs: "Kontaktieren Sie uns",
    name: "Name",
    email: "E-Mail",
    message: "Nachricht",
    send: "Senden",
    week1: "Diese Woche",
    week2: "Nächste Woche",
    thisWeek: "Speisekarte 1",
    nextWeek: "Speisekarte 2",
    print: "Drucken",
    whatWeDo: "WAS WIR MACHEN",
    farmAreas: "Bauernhofgelände",
    idNumber: "ID",
    vatId: "USt-ID-Nr.",
    plantProduction: "Pflanzenproduktion",
    animalProduction: "Tierproduktion",
    companyCanteen: "Betriebskantine",
    plantProductionText1:
      "Unsere Genossenschaft bewirtschaftet insgesamt 2580 Hektar landwirtschaftliche Fläche, davon sind 1570 Hektar Ackerland und 1010 Hektar Wiesen und Weiden. Die Genossenschaft spezialisiert sich auf die Produktion von Getreide, hauptsächlich Weizen, Gerste und Triticale.",
    plantProductionText2:
      "Aufgrund der umfangreichen Viehzucht konzentrieren wir uns auf den Anbau von Futterpflanzen, hauptsächlich Klee-Gras und Mais für Silage. Die Marktfrucht ist Raps, den wir auf 240 Hektar Land anbauen.",
    animalProductionText1:
      "Die Genossenschaft beschäftigt sich mit Rinder- und Geflügelzucht. Die Haupttätigkeit ist die Milchproduktion, in modernen Ställen halten wir 600 Milchkühe mit einer Jahresproduktion von 5 Millionen Litern. Wir haben 200 Kühe auf Weiden ohne kommerzielle Milchproduktion.",
    animalProductionText2:
      "Wir führen Hühnermast in vier Aufzuchtbetrieben durch. Im Bereich Borovany betreiben wir eine kleine Geflügelschlachterei, dank der wir Interessenten ausgenommenes Huhn direkt vom Züchter anbieten können.",
    companyCanteenText1:
      "Wir betreiben eine Betriebskantine, die sowohl den Mitarbeitern als auch der breiten Öffentlichkeit dient. Wir konzentrieren uns auf die traditionelle tschechische Küche. <strong>Der Preis für das Mittagessen beträgt 115 CZK inklusive Suppe.</strong> Das Mittagessen kann in der Kantine eingenommen oder in eigenen Behältern mitgenommen werden.",
    companyCanteenText2:
      "In der Betriebsküche produzieren wir auch Semmelknödel, die wir an örtliche Restaurants liefern. <strong>Der Preis für 1 Stück Knödel mit einem Gewicht von 600 g beträgt 40 CZK.</strong>",
    followUs: "Folgen Sie uns",
    chairmanBoard: "Vorstandsvorsitzender",
    viceChairmanBoard: "Stellvertretender Vorstandsvorsitzender",
    economist: "Ökonom",
    chiefZootechnician: "Leiter der Tierproduktion",
    chiefMechanizer: "Hauptmechaniker",
    landManagement: "Flächenmanagement",
    kitchenManager: "Küchenleiterin",
    writeToUs: "Schreiben Sie uns",
    nameAndSurname: "Vor- und Nachname",
    phone: "Telefon",
    whereToFindUs: "Wo Sie uns finden",
    showLargerMap: "Größere Karte anzeigen",
    sendingMessage: "Senden...",
    sendMessage: "Nachricht senden",
    messageSuccessfullySent: "Nachricht wurde erfolgreich gesendet",
    errorSendingMessage: "Fehler beim Senden der Nachricht",
    gdprConsent: "Mit dem Absenden des Formulars stimmen Sie der",
    gdprLink: "Verarbeitung personenbezogener Daten",
    gdprPurpose: "zum Zweck der Bearbeitung Ihrer Anfrage zu.",
    contacts: "KONTAKTE",
    // Nové překlady
    modernAgricultural: "Moderne landwirtschaftliche Genossenschaft mit Tradition",
    address: "Adresse",
    dataBox: "Datenbox",
    openingHours: "Öffnungszeiten",
    weekdays: "Mo–Fr",
    weekend: "Sa–So: geschlossen",
    allRightsReserved: "Alle Rechte vorbehalten",
    mainNavigation: "Hauptnavigation",
    aktualita1: "Neuigkeit 1",
    aktualita2: "Aktuell 2",
    aktualita3: "Aktuell 3",
    aktualita4: "Aktuell 4",
    grantTitle1: "Agrarförderungen 1",
    grantTitle2: "Agrarförderungen 2",
    grantTitle3: "Agrarförderungen 3",
    grantTitle4: "Agrarförderungen 4",
    grantTitle5: "Agrarförderungen 5",
    grantTitle6: "Agrarförderungen 6",
    // GDPR stránka
    backToContacts: "Zurück zu Kontakten",
    privacyPolicy: "Datenschutzrichtlinie",
    dataController: "Datenverantwortlicher",
    dataControllerText:
      "Der Datenverantwortliche für Ihre personenbezogenen Daten ist Zemědělské obchodní družstvo Borovany, IČO: 00109207, mit Sitz in Vodárenská 97, 373 12 Borovany.",
    processingPurpose: "Zweck der Verarbeitung personenbezogener Daten",
    processingPurposeText:
      "Wir verarbeiten Ihre personenbezogenen Daten zum Zweck der Bearbeitung Ihrer über das Kontaktformular auf unserer Website gesendeten Anfrage.",
    processingPeriod: "Verarbeitungsdauer",
    processingPeriodText:
      "Wir verarbeiten personenbezogene Daten für die zur Bearbeitung Ihrer Anfrage erforderliche Zeit, jedoch maximal für 1 Jahr ab deren Übermittlung, sofern wir keine längere Zeit vereinbaren.",
    yourRights: "Ihre Rechte",
    yourRightsText: "Im Zusammenhang mit der Verarbeitung Ihrer personenbezogenen Daten haben Sie folgende Rechte:",
    rightAccess: "Recht auf Zugang zu personenbezogenen Daten",
    rightRectification: "Recht auf Berichtigung unrichtiger Daten",
    rightErasure: "Recht auf Löschung (Recht auf Vergessenwerden)",
    rightRestriction: "Recht auf Einschränkung der Verarbeitung",
    rightPortability: "Recht auf Datenübertragbarkeit",
    rightObject: "Recht auf Widerspruch",
    rightComplaint: "Recht auf Beschwerde bei einer Aufsichtsbehörde (Amt für den Schutz personenbezogener Daten)",
    contactInformation: "Kontaktinformationen",
    contactInformationText:
      "Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten können Sie uns unter der E-Mail-Adresse kontaktieren:",
    policyChanges: "Änderungen der Datenschutzrichtlinie",
    policyChangesText:
      "Diese Datenschutzrichtlinie kann aktualisiert werden. Die aktuelle Version wird immer auf dieser Website veröffentlicht.",
  },
}

// Vytvoření defaultní hodnoty pro kontext
const defaultContextValue: LanguageContextType = {
  language: "cs",
  setLanguage: () => {},
  t: (key) => key,
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("cs")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["cs"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
