"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuizContainer } from "@/components/quiz-container";
import { useCandidateContext } from "@/lib/candidate-context";

export default function QuizPage() {
  const { candidateData, resetCandidateData } = useCandidateContext();
  const router = useRouter();

  useEffect(() => {
    if (!candidateData) {
      router.push("/register");
    }
  }, [candidateData, router]);

  if (!candidateData) {
    return null; // Or a loading state
  }

  return (
    <QuizContainer />
  );
}