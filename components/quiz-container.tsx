"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation";
import { QuizQuestion } from "./quiz-question"
import { QuizTimer } from "./quiz-timer"
import { QuizProgress } from "./quiz-progress"
import { CandidateHeader } from "./candidate-header"
import { useCandidateContext } from "@/lib/candidate-context"

import { selectQuizQuestions, type QuizQuestionData } from "@/lib/quiz-questions"

interface QuizContainerProps {
  onComplete?: (score: number, totalQuestions: number, timeUsed: number) => void;
}

export function QuizContainer({ onComplete }: QuizContainerProps) {
  const { candidateData, setQuizResult, quizProgress, setQuizProgress } = useCandidateContext();
  const router = useRouter();
  const [questions] = useState<QuizQuestionData[]>(() => quizProgress?.questions ?? selectQuizQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(quizProgress?.currentQuestionIndex ?? 0);
  const [score, setScore] = useState(quizProgress?.score ?? 0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(quizProgress?.selectedAnswer ?? null);
  const completed = useRef(false);
  const [startedAt] = useState(() => quizProgress?.startedAt ?? Date.now());
  const [deadline] = useState(() => quizProgress?.deadline ?? startedAt + 300_000);
  useEffect(() => {
    setQuizProgress({ questions, currentQuestionIndex, score, selectedAnswer, startedAt, deadline });
  }, [questions, currentQuestionIndex, score, selectedAnswer, startedAt, deadline, setQuizProgress]);
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const finish = (finalScore: number) => {
    if (completed.current) return;
    completed.current = true;
    const timeUsed = Math.min(300, Math.round((Date.now() - startedAt) / 1000));
    if (onComplete) onComplete(finalScore, questions.length, timeUsed);
    else { setQuizResult({ score: finalScore, totalQuestions: questions.length, timeUsed }); router.push('/results'); }
  };
  const handleNextQuestion = () => {
    if (!currentQuestion || selectedAnswer === null || completed.current) return;
    const nextScore = score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
    if (isLastQuestion) finish(nextScore);
    else { setScore(nextScore); setCurrentQuestionIndex(previous => previous + 1); setSelectedAnswer(null); }
  };
  useEffect(() => {
    if (!currentQuestion) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
      const index = Number(event.key) - 1;
      if (index >= 0 && index < currentQuestion.options.length) { event.preventDefault(); setSelectedAnswer(index); }
      else if (event.key === 'Enter' && !(event.target instanceof HTMLElement && event.target.closest('button'))) { event.preventDefault(); handleNextQuestion(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });
  if (!candidateData || !currentQuestion) return null;
  return (
    <main className="assessment-stage">
      <div className="w-full max-w-[680px] space-y-[18px]">
        <div className="flex flex-col items-stretch gap-[18px] sm:flex-row">
          <CandidateHeader candidateData={candidateData} />
          <QuizTimer deadline={deadline} onTimeUp={() => finish(score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0))} />
        </div>
        <QuizProgress current={currentQuestionIndex + 1} total={questions.length} />
        <section className="assessment-card px-[22px] pb-6 pt-7 sm:px-10 sm:pb-8 sm:pt-10">
          <QuizQuestion question={{ ...currentQuestion, id: currentQuestionIndex + 1 }} selectedAnswer={selectedAnswer} onAnswerSelect={setSelectedAnswer} />
          <div className="mt-7 flex flex-col-reverse items-stretch justify-between gap-3.5 sm:flex-row sm:items-center">
            <p className="text-center font-mono text-[11px] tracking-[.04em] text-foreground/40 sm:text-left">Press <kbd className="rounded bg-[#E5DFFB] px-1.5 py-0.5 text-foreground">1</kbd>–<kbd className="rounded bg-[#E5DFFB] px-1.5 py-0.5 text-foreground">4</kbd> to answer · <kbd className="rounded bg-[#E5DFFB] px-1.5 py-0.5 text-foreground">↵</kbd> to continue</p>
            <button onClick={handleNextQuestion} disabled={selectedAnswer === null} className="assessment-button shrink-0 px-[30px] py-3.5">{isLastQuestion ? "Finish" : "Next Question"}<ArrowRight size={16} /></button>
          </div>
        </section>
      </div>
    </main>
  );
}
