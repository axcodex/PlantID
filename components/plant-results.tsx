"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Leaf, AlertTriangle, Pill } from "lucide-react"

interface PlantResultsProps {
  results: {
    plantName: string
    confidence: number
    isHealthy: boolean
    disease?: string
    treatment?: string
    imageUrl?: string
  }
}

export default function PlantResults({ results }: PlantResultsProps) {
  const { t } = useLanguage()

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-square w-full bg-emerald-100">
            {results.imageUrl ? (
              <img
                src={results.imageUrl || "/placeholder.svg"}
                alt={results.plantName}
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={`/placeholder.svg?height=400&width=400&text=${encodeURIComponent(results.plantName)}`}
                alt={results.plantName}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Leaf className="h-5 w-5 text-emerald-600" />
            <h3 className="text-xl font-bold text-emerald-800">{results.plantName}</h3>
            <Badge
              variant={results.isHealthy ? "success" : "destructive"}
              className={results.isHealthy ? "bg-green-500" : "bg-red-500"}
            >
              {results.confidence.toFixed(1)}%
            </Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={2} className="text-center text-emerald-700">
                  {t("plantName")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{t("plantName")}</TableCell>
                <TableCell>{results.plantName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">{t("confidence")}</TableCell>
                <TableCell>{results.confidence.toFixed(1)}%</TableCell>
              </TableRow>

              {!results.isHealthy && results.disease && (
                <>
                  <TableRow>
                    <TableHead colSpan={2} className="border-t text-center text-emerald-700">
                      <div className="flex items-center justify-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        {t("disease")}
                      </div>
                    </TableHead>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t("disease")}</TableCell>
                    <TableCell>{results.disease}</TableCell>
                  </TableRow>
                  {results.treatment && (
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-blue-500" />
                          {t("treatment")}
                        </div>
                      </TableCell>
                      <TableCell>{results.treatment}</TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

