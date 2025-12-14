"use client"

import { Card } from "@/components/ui/card"

interface QuizProgressProps {
  current: number
  total: number
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = (current / total) * 100

  return (
    <Card className="p-4 border-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-700">Question Progress</span>
        <span className="text-sm font-semibold text-slate-700">
          {current} of {total}
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Card>
  )
}
