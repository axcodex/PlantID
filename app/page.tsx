import { Suspense } from "react"
import PlantIdentifier from "@/components/plant-identifier"
import LanguageSelector from "@/components/language-selector"
import AppFeatures from "@/components/app-features"
import Faqs from "@/components/faqs"
import { Leaf } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100">
      <header className="bg-gradient-to-r from-emerald-600 to-green-500 p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">PlantID</h1>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-emerald-800">Plant Identification App</h2>
          <p className="mx-auto max-w-2xl text-lg text-emerald-700">
            Identify plants and plant diseases instantly. Upload an image or take a photo to get started.
          </p>
        </section>

        <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-xl bg-emerald-200"></div>}>
          <PlantIdentifier />
        </Suspense>

        <AppFeatures />

        <Faqs />
      </div>

      <footer className="bg-emerald-800 p-6 text-center text-white">
        <p>© {new Date().getFullYear()} PlantID. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Supported languages: English (en), Urdu (ur), Hindi (hi), Pashto (ps), Punjabi (pa), Sindhi (sd), Balochi
          (bal)
        </p>
      </footer>
    </main>
  )
}

