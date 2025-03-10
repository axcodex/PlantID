"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "ur" | "hi" | "ps" | "pa" | "sd" | "bal"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    appTitle: "Plant Identification App",
    uploadImage: "Upload Image",
    takePhoto: "Take Photo",
    identify: "Identify",
    uploadPrompt: "Upload an image or take a photo",
    results: "Results",
    loading: "Analyzing your plant...",
    appFeatures: "App Features",
    faqs: "Frequently Asked Questions",
    noImageSelected: "No image selected",
    plantName: "Plant Name",
    confidence: "Confidence",
    disease: "Disease",
    treatment: "Treatment",
    tryAgain: "Try Again",
  },
  ur: {
    appTitle: "پودوں کی شناخت ایپ",
    uploadImage: "تصویر اپلوڈ کریں",
    takePhoto: "تصویر لیں",
    identify: "شناخت کریں",
    uploadPrompt: "تصویر اپلوڈ کریں یا تصویر لیں",
    results: "نتائج",
    loading: "آپ کے پودے کا تجزیہ کیا جا رہا ہے...",
    appFeatures: "ایپ کی خصوصیات",
    faqs: "اکثر پوچھے گئے سوالات",
    noImageSelected: "کوئی تصویر منتخب نہیں کی گئی",
    plantName: "پودے کا نام",
    confidence: "اعتماد",
    disease: "بیماری",
    treatment: "علاج",
    tryAgain: "دوبارہ کوشش کریں",
  },
  hi: {
    appTitle: "पौधों की पहचान ऐप",
    uploadImage: "छवि अपलोड करें",
    takePhoto: "फोटो लें",
    identify: "पहचानें",
    uploadPrompt: "छवि अपलोड करें या फोटो लें",
    results: "परिणाम",
    loading: "आपके पौधे का विश्लेषण किया जा रहा है...",
    appFeatures: "ऐप विशेषताएं",
    faqs: "अक्सर पूछे जाने वाले प्रश्न",
    noImageSelected: "कोई छवि चयनित नहीं",
    plantName: "पौधे का नाम",
    confidence: "विश्वास",
    disease: "रोग",
    treatment: "उपचार",
    tryAgain: "पुनः प्रयास करें",
  },
  ps: {
    appTitle: "د نباتاتو پیژندنې اپلیکیشن",
    uploadImage: "انځور پورته کړئ",
    takePhoto: "عکس واخلئ",
    identify: "وپیژنئ",
    uploadPrompt: "انځور پورته کړئ یا عکس واخلئ",
    results: "پایلې",
    loading: "ستاسو نبات تحلیل کیږي...",
    appFeatures: "د اپلیکیشن ځانګړتیاوې",
    faqs: "په مکرر ډول پوښتل شوي پوښتنې",
    noImageSelected: "هیڅ انځور نه دی غوره شوی",
    plantName: "د نبات نوم",
    confidence: "باور",
    disease: "ناروغي",
    treatment: "درملنه",
    tryAgain: "بیا هڅه وکړئ",
  },
  pa: {
    appTitle: "ਪੌਦਿਆਂ ਦੀ ਪਛਾਣ ਐਪ",
    uploadImage: "ਚਿੱਤਰ ਅਪਲੋਡ ਕਰੋ",
    takePhoto: "ਫੋਟੋ ਲਓ",
    identify: "ਪਛਾਣੋ",
    uploadPrompt: "ਚਿੱਤਰ ਅਪਲੋਡ ਕਰੋ ਜਾਂ ਫੋਟੋ ਲਓ",
    results: "ਨਤੀਜੇ",
    loading: "ਤੁਹਾਡੇ ਪੌਦੇ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    appFeatures: "ਐਪ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
    faqs: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ",
    noImageSelected: "ਕੋਈ ਚਿੱਤਰ ਚੁਣਿਆ ਨਹੀਂ ਗਿਆ",
    plantName: "ਪੌਦੇ ਦਾ ਨਾਮ",
    confidence: "ਵਿਸ਼ਵਾਸ",
    disease: "ਬਿਮਾਰੀ",
    treatment: "ਇਲਾਜ",
    tryAgain: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
  },
  sd: {
    appTitle: "ٻوٽن جي سڃاڻپ ايپ",
    uploadImage: "تصوير اپلوڊ ڪريو",
    takePhoto: "تصوير وٺو",
    identify: "سڃاڻپ ڪريو",
    uploadPrompt: "تصوير اپلوڊ ڪريو يا تصوير وٺو",
    results: "نتيجا",
    loading: "توهان جي ٻوٽي جو تجزيو ڪيو پيو وڃي...",
    appFeatures: "ايپ جون خاصيتون",
    faqs: "اڪثر پڇيا ويندڙ سوال",
    noImageSelected: "ڪا به تصوير چونڊيل ناهي",
    plantName: "ٻوٽي جو نالو",
    confidence: "اعتماد",
    disease: "بيماري",
    treatment: "علاج",
    tryAgain: "ٻيهر ڪوشش ڪريو",
  },
  bal: {
    appTitle: "بوٹانی پژاننگ ایپ",
    uploadImage: "عکس آپلود کنیت",
    takePhoto: "عکس بگریت",
    identify: "پژاننگ کنیت",
    uploadPrompt: "عکس آپلود کنیت یا عکس بگریت",
    results: "نتیجه",
    loading: "شمی بوٹی تجزیه بیت...",
    appFeatures: "ایپ ءِ خاصیت آن",
    faqs: "گیشتر پرسگ بوتگین سوال",
    noImageSelected: "هچ عکس انتخاب نه بوتگ",
    plantName: "بوٹی ءِ نام",
    confidence: "اعتماد",
    disease: "ناجوڑی",
    treatment: "درمان",
    tryAgain: "پدا کوشش کنیت",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key] || key
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

