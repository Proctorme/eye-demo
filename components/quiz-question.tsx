"use client";
import { Check } from "lucide-react";
interface QuizQuestionProps {
  question: { id: number; question: string; options: string[]; correctAnswer: number };
  selectedAnswer: number | null;
  onAnswerSelect: (optionIndex: number) => void;
}
export function QuizQuestion({ question, selectedAnswer, onAnswerSelect }: QuizQuestionProps) {
  return <div key={question.id} className="motion-safe:animate-[question-in_.45s_ease-out]">
    <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[.16em] text-primary">Question {String(question.id).padStart(2, "0")}</p>
    <h1 id="question-title" className="mb-[30px] min-h-[70px] font-display text-[clamp(22px,3.2vw,29px)] font-semibold leading-[1.22] tracking-tight">{question.question}</h1>
    <div className="space-y-3" role="group" aria-labelledby="question-title">
      {question.options.map((option, index) => {
        const selected = selectedAnswer === index;
        return <button key={index} type="button" aria-pressed={selected} onClick={() => onAnswerSelect(index)} className={`flex w-full items-center gap-4 rounded-2xl border-[1.5px] px-[18px] py-4 text-left text-[15.5px] font-semibold transition-all hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${selected ? "border-primary bg-primary text-white shadow-[0_12px_28px_-10px_#6a2be98c]" : "border-border bg-[#FCFBFE] hover:border-[#AF46E8] hover:shadow-md hover:shadow-primary/10"}`}>
          <span className={`grid size-[30px] shrink-0 place-items-center rounded-[9px] font-mono text-[12.5px] ${selected ? "bg-white/20 text-white" : "bg-primary/8 text-primary"}`}>{"ABCD"[index]}</span><span>{option}</span><span className={`ml-auto grid size-5 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-white bg-white text-primary" : "scale-85 border-[#D3BBF4]"}`}>{selected && <Check size={12} strokeWidth={3.4} />}</span>
        </button>;
      })}
    </div>
  </div>;
}
