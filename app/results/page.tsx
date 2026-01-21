"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ResultsScreen } from "@/components/results-screen";
import { useCandidateContext } from "@/lib/candidate-context";

export default function ResultsPage() {
  const { candidateData, quizResult, resetCandidateData, widgetRef } = useCandidateContext();
  const router = useRouter();

  useEffect(() => {
    if (!candidateData || !quizResult) {
      router.push("/register");
    }
  }, [candidateData, quizResult, router]);

  const handleRetry = () => {
    // End the proctoring session if widget is available
    if (widgetRef?.current) {
      try {
        widgetRef.current.endProctoring();
      } catch (error) {
        console.error("Error ending proctoring:", error);
      }
    }

    resetCandidateData();
    router.push("/register");
  };

  if (!candidateData || !quizResult) {
    return null; // Or a loading state
  }

  return (
    <ResultsScreen
      score={quizResult.score}
      totalQuestions={quizResult.totalQuestions}
      candidateData={candidateData}
      onRetry={handleRetry}
    />
  );
}