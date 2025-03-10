"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Camera, Loader2, RefreshCw } from "lucide-react"
import PlantResults from "@/components/plant-results"
import { identifyPlant } from "@/lib/gemini-api"
import { initializeApiKeys } from "@/lib/api-init"

export default function PlantIdentifier() {
  const { t } = useLanguage()
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  // Initialize API keys when component mounts
  useEffect(() => {
    initializeApiKeys()
  }, [])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setResults(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height)

      const imageDataUrl = canvas.toDataURL("image/jpeg")
      setImage(imageDataUrl)
      stopCamera()
      setResults(null)
    }
  }

  const handleIdentify = async () => {
    if (!image) return

    setIsAnalyzing(true)
    try {
      // Ensure API keys are initialized before making the API call
      initializeApiKeys()
      const plantData = await identifyPlant(image)
      setResults(plantData)
    } catch (error) {
      console.error("Error identifying plant:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAll = () => {
    setImage(null)
    setResults(null)
    stopCamera()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="mx-auto mb-16 overflow-hidden shadow-xl md:max-w-4xl">
      <CardContent className="p-0">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="py-4">
              <Upload className="mr-2 h-4 w-4" />
              {t("uploadImage")}
            </TabsTrigger>
            <TabsTrigger value="camera" className="py-4">
              <Camera className="mr-2 h-4 w-4" />
              {t("takePhoto")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div
                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-emerald-300 bg-emerald-50 hover:bg-emerald-100"
                onClick={() => fileInputRef.current?.click()}
              >
                {image ? (
                  <img
                    src={image || "/placeholder.svg"}
                    alt="Uploaded plant"
                    className="h-full max-h-64 w-auto object-contain"
                  />
                ) : (
                  <>
                    <Upload className="mb-2 h-10 w-10 text-emerald-500" />
                    <p className="text-center text-emerald-700">{t("uploadPrompt")}</p>
                  </>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
              <div className="flex w-full gap-4">
                <Button variant="outline" className="flex-1" onClick={resetAll}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t("tryAgain")}
                </Button>
                <Button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  onClick={handleIdentify}
                  disabled={!image || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("loading")}
                    </>
                  ) : (
                    <>{t("identify")}</>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="camera" className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-64 w-full overflow-hidden rounded-lg border-2 border-emerald-300 bg-emerald-50">
                {image ? (
                  <img
                    src={image || "/placeholder.svg"}
                    alt="Captured plant"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className={`h-full w-full object-cover ${stream ? "block" : "hidden"}`}
                    />
                    {!stream && (
                      <div className="flex h-full w-full flex-col items-center justify-center">
                        <Camera className="mb-2 h-10 w-10 text-emerald-500" />
                        <p className="text-center text-emerald-700">{t("takePhoto")}</p>
                      </div>
                    )}
                  </>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="flex w-full gap-4">
                {!image ? (
                  <>
                    {stream ? (
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={capturePhoto}>
                        <Camera className="mr-2 h-4 w-4" />
                        {t("takePhoto")}
                      </Button>
                    ) : (
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={startCamera}>
                        <Camera className="mr-2 h-4 w-4" />
                        {t("takePhoto")}
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="flex-1" onClick={resetAll}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      {t("tryAgain")}
                    </Button>
                    <Button
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      onClick={handleIdentify}
                      disabled={!image || isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("loading")}
                        </>
                      ) : (
                        <>{t("identify")}</>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {results && (
          <div className="border-t border-emerald-200 p-6">
            <h3 className="mb-4 text-xl font-bold text-emerald-800">{t("results")}</h3>
            <PlantResults results={results} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

