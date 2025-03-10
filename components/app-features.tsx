"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Leaf, AlertTriangle } from "lucide-react"

export default function AppFeatures() {
  const { t } = useLanguage()

  const features = [
    {
      title: "Plant Identification",
      description: "Instantly identify thousands of plant species with our advanced AI technology.",
      icon: <Leaf className="h-10 w-10 text-emerald-500" />,
      color: "bg-emerald-100",
    },
    {
      title: "Disease Detection",
      description: "Detect plant diseases early and get treatment recommendations to save your plants.",
      icon: <AlertTriangle className="h-10 w-10 text-amber-500" />,
      color: "bg-amber-100",
    },
    {
      title: "Camera Integration",
      description: "Take photos directly in the app or upload existing images for instant identification.",
      icon: <Camera className="h-10 w-10 text-blue-500" />,
      color: "bg-blue-100",
    },
  ]

  return (
    <section className="my-16">
      <h2 className="mb-8 text-center text-3xl font-bold text-emerald-800">{t("appFeatures")}</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className={`flex h-20 items-center justify-center ${feature.color}`}>{feature.icon}</div>
            <CardHeader className="pb-2">
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

