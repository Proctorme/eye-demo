"use client";

import { createContext, useContext, useState, ReactNode, RefObject } from "react";
import { IWidget } from "@/global";

export type CandidateData = {
  apiKey: string;
  candidateId: string;
  assessmentId: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  enableFacialRecognition: boolean;
};

type QuizResult = {
  score: number;
  totalQuestions: number;
};

type CandidateContextType = {
  candidateData: CandidateData | null;
  setCandidateData: (data: CandidateData) => void;
  resetCandidateData: () => void;
  quizResult: QuizResult | null;
  setQuizResult: (result: QuizResult) => void;
  widgetRef: RefObject<IWidget> | null;
  setWidgetRef: (ref: RefObject<IWidget>) => void;
};

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

export function CandidateProvider({ children }: { children: ReactNode }) {
  const [candidateData, setCandidateData] = useState<CandidateData | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [widgetRef, setWidgetRef] = useState<RefObject<IWidget> | null>(null);

  const resetCandidateData = () => {
    setCandidateData(null);
    setQuizResult(null);
    setWidgetRef(null);
  };

  return (
    <CandidateContext.Provider
      value={{
        candidateData,
        setCandidateData,
        resetCandidateData,
        quizResult,
        setQuizResult,
        widgetRef,
        setWidgetRef
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
}

export function useCandidateContext() {
  const context = useContext(CandidateContext);
  if (context === undefined) {
    throw new Error(
      "useCandidateContext must be used within a CandidateProvider"
    );
  }
  return context;
}