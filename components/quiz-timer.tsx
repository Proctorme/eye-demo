"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface QuizTimerProps {
  duration: number // in seconds
  onTimeUp: () => void
}

export function QuizTimer({ duration, onTimeUp }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onTimeUp])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isWarning = timeLeft <= 60

  return (
    <Card
      className={`
      px-6 py-4 border-2 font-mono text-xl font-bold text-center min-w-fit
      ${isWarning ? "bg-red-50 border-red-500 text-red-600" : "bg-blue-50 border-blue-500 text-blue-600"}
    `}
    >
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </Card>
  )
}
