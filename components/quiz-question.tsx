"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuizQuestionProps {
  question: {
    id: number
    question: string
    options: string[]
    correctAnswer: number
  }
  selectedAnswer: number | null
  answered: boolean
  onAnswerSelect: (optionIndex: number) => void
}

export function QuizQuestion({ question, selectedAnswer, answered, onAnswerSelect }: QuizQuestionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">{question.question}</h2>

      <RadioGroup value={selectedAnswer !== null ? String(selectedAnswer) : ""}>
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === question.correctAnswer
            const showCorrect = answered && isCorrect
            const showWrong = answered && isSelected && !isCorrect

            return (
              <div key={index} className="flex items-center space-x-3">
                <RadioGroupItem
                  value={String(index)}
                  id={`option-${index}`}
                  onClick={() => onAnswerSelect(index)}
                  disabled={answered}
                  className={`
                    ${showCorrect && "border-green-500 text-green-500"}
                    ${showWrong && "border-red-500 text-red-500"}
                  `}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className={`
                    flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${isSelected && !answered && "border-blue-500 bg-blue-50"}
                    ${showCorrect && "border-green-500 bg-green-50"}
                    ${showWrong && "border-red-500 bg-red-50"}
                    ${!isSelected && !answered && "border-slate-200 hover:border-slate-300"}
                    ${answered && !isSelected && !isCorrect && "border-slate-200 opacity-50"}
                    font-normal
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900">{option}</span>
                    {showCorrect && <span className="text-green-600 font-semibold">✓</span>}
                    {showWrong && <span className="text-red-600 font-semibold">✗</span>}
                  </div>
                </Label>
              </div>
            )
          })}
        </div>
      </RadioGroup>

      {answered && (
        <div
          className={`
            p-4 rounded-lg text-sm font-medium
            ${selectedAnswer === question.correctAnswer ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
          `}
        >
          {selectedAnswer === question.correctAnswer
            ? "✓ Correct answer!"
            : "✗ Incorrect. The correct answer is: " + question.options[question.correctAnswer]}
        </div>
      )}
    </div>
  )
}
