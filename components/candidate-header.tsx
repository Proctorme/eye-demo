"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import type { CandidateData } from "@/app/page"

interface CandidateHeaderProps {
  candidateData: CandidateData
}

export function CandidateHeader({ candidateData }: CandidateHeaderProps) {
  return (
    <Card className="border-2 p-4 flex items-center gap-4 flex-1">
      <div className="relative w-14 h-14 flex-shrink-0">
        <Image
          src={candidateData.imageUrl || "/placeholder.svg"}
          alt={`${candidateData.firstName} ${candidateData.lastName}`}
          fill
          className="object-cover rounded-lg"
          onError={(e) => {
            const img = e.target as HTMLImageElement
            img.src = "/abstract-profile.png"
          }}
        />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-slate-900 truncate">
          {candidateData.firstName} {candidateData.lastName}
        </h3>
        <p className="text-xs text-slate-600 truncate">ID: {candidateData.candidateId}</p>
        {candidateData.enableFacialRecognition && (
          <p className="text-xs font-semibold text-blue-600 mt-1">🔍 Facial Recognition Enabled</p>
        )}
      </div>
    </Card>
  )
}
