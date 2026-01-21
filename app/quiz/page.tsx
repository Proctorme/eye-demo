"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuizContainer } from "@/components/quiz-container";
import { useCandidateContext } from "@/lib/candidate-context";

export default function QuizPage() {
  const { candidateData, resetCandidateData, setQuizResult, widgetRef } = useCandidateContext();
  const router = useRouter();

  useEffect(() => {
    if (!candidateData) {
      router.push("/register");
    }
  }, [candidateData, router]);

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    // Store the quiz result in context
    setQuizResult({ score, totalQuestions });

    // End the proctoring session if widget is available
    if (widgetRef?.current) {
      try {
        widgetRef.current.endProctoring();
      } catch (error) {
        console.error("Error ending proctoring:", error);
      }
    }

    // Navigate to results page
    router.push("/results");
  };

  if (!candidateData) {
    return null; // Or a loading state
  }

  return (
    <QuizContainer
      onComplete={handleQuizComplete}
    />
  );
}