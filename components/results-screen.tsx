"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { CandidateData } from "@/app/page"

interface ResultsScreenProps {
  score: number
  totalQuestions: number
  candidateData: CandidateData
  onRetry: () => void
}

export function ResultsScreen({ score, totalQuestions, candidateData, onRetry }: ResultsScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const passed = percentage >= 70

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-md border-2 p-8">
        <div className="text-center space-y-6">
          <div className="relative w-24 h-24 mx-auto">
            <Image
              src={candidateData.imageUrl || "/placeholder.svg"}
              alt={`${candidateData.firstName} ${candidateData.lastName}`}
              fill
              className="object-cover rounded-full"
              onError={(e) => {
                const img = e.target as HTMLImageElement
                img.src = "/abstract-profile.png"
              }}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {candidateData.firstName} {candidateData.lastName}
            </h2>
            <p className="text-sm text-slate-600">Assessment Complete</p>
          </div>

          <div
            className={`
            rounded-lg p-6 space-y-2
            ${passed ? "bg-green-100" : "bg-orange-100"}
          `}
          >
            <div className={`text-4xl font-bold ${passed ? "text-green-600" : "text-orange-600"}`}>{percentage}%</div>
            <div className={`text-sm font-semibold ${passed ? "text-green-800" : "text-orange-800"}`}>
              {score} out of {totalQuestions} correct
            </div>
            <div className={`text-sm font-semibold ${passed ? "text-green-700" : "text-orange-700"}`}>
              {passed ? "✓ Passed" : "✗ Did not pass"}
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <Button onClick={onRetry} className="w-full h-11 font-semibold">
              Take Quiz Again
            </Button>
          </div>

          <div className="text-xs text-slate-500 pt-4">
            <p>Assessment ID: {candidateData.assessmentId}</p>
            <p>Candidate ID: {candidateData.candidateId}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
