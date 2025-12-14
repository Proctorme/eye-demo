"use client"

import { useState } from "react"
import { QuizQuestion } from "./quiz-question"
import { QuizTimer } from "./quiz-timer"
import { QuizProgress } from "./quiz-progress"
import { CandidateHeader } from "./candidate-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { CandidateData } from "@/app/page"

interface QuizContainerProps {
  candidateData: CandidateData
  onComplete: (score: number, total: number) => void
}

// Sample questions - replace with your actual questions
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: 3,
  },
  {
    id: 4,
    question: 'Who wrote "Romeo and Juliet"?',
    options: ["Jane Austen", "William Shakespeare", "Mark Twain", "Charles Dickens"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
  },
]

export function QuizContainer({ candidateData, onComplete }: QuizContainerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1

  const handleAnswerSelect = (optionIndex: number) => {
    if (!answered) {
      setSelectedAnswer(optionIndex)
      setAnswered(true)

      // Check if answer is correct
      if (optionIndex === currentQuestion.correctAnswer) {
        setScore((prev) => prev + 1)
      }
    }
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      onComplete(score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0), QUIZ_QUESTIONS.length)
    } else {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    }
  }

  const handleTimeUp = () => {
    setTimeUp(true)
    onComplete(score, QUIZ_QUESTIONS.length)
  }

  if (timeUp) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header with candidate info and timer */}
        <div className="flex items-center justify-between gap-4">
          <CandidateHeader candidateData={candidateData} />
          <QuizTimer duration={300} onTimeUp={handleTimeUp} />
        </div>

        {/* Progress bar */}
        <QuizProgress current={currentQuestionIndex + 1} total={QUIZ_QUESTIONS.length} />

        {/* Question card */}
        <Card className="p-8 border-2">
          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            answered={answered}
            onAnswerSelect={handleAnswerSelect}
          />

          {/* Navigation button */}
          <div className="mt-8 flex justify-end">
            <Button onClick={handleNextQuestion} disabled={!answered} className="px-8 h-11 font-semibold" size="lg">
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
