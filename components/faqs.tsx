"use client"

import { useLanguage } from "@/contexts/language-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Faqs() {
  const { t } = useLanguage()

  const faqs = [
    {
      question: "How accurate is the plant identification?",
      answer:
        "Our plant identification system uses advanced AI technology and has an accuracy rate of over 90% for common plant species. The accuracy may vary for rare or uncommon plants.",
    },
    {
      question: "Can I identify plants without an internet connection?",
      answer:
        "No, an internet connection is required for plant identification as the app needs to communicate with our AI servers to process the images.",
    },
    {
      question: "How do I get the best results when taking photos?",
      answer:
        "For best results, take clear, well-lit photos of the plant. Focus on distinctive features like leaves, flowers, or fruits. Avoid shadows and make sure the plant is the main subject in the frame.",
    },
    {
      question: "Can the app identify plant diseases?",
      answer:
        "Yes, our app can identify common plant diseases and provide treatment recommendations. However, for severe cases, we recommend consulting with a professional botanist or plant pathologist.",
    },
    {
      question: "Which languages are supported?",
      answer:
        "The app currently supports English (en), Urdu (ur), Hindi (hi), Pashto (ps), Punjabi (pa), and Sindhi (sd). We are continuously working to add more languages.",
    },
  ]

  return (
    <section className="my-16">
      <h2 className="mb-8 text-center text-3xl font-bold text-emerald-800">{t("faqs")}</h2>

      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-500 pb-4">
          <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-emerald-800">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-emerald-700">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  )
}

