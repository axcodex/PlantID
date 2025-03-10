"use client"

import { useLanguage } from "@/contexts/language-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English" },
  { code: "ur", name: "اردو" },
  { code: "hi", name: "हिंदी" },
  { code: "ps", name: "پښتو" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "sd", name: "سنڌي" },
  { code: "bal", name: "بلوچی" },
]

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5 text-white" />
      <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
        <SelectTrigger className="w-[120px] border-white bg-transparent text-white">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

