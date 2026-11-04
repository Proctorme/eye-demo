"use client";

import { createContext, useContext, useState, useRef, useEffect, ReactNode, RefObject } from "react";
import type { QuizQuestionData } from "@/lib/quiz-questions";
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
  timeUsed?: number;
};

export type QuizProgressState = {
  questions: QuizQuestionData[];
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: number | null;
  startedAt: number;
  deadline: number;
};
const STORAGE_KEY = "eye-demo-session-v1";

type CandidateContextType = {
  hydrated: boolean;
  quizProgress: QuizProgressState | null;
  setQuizProgress: (progress: QuizProgressState | null) => void;
  candidateData: CandidateData | null;
  setCandidateData: (data: CandidateData) => void;
  resetCandidateData: () => void;
  quizResult: QuizResult | null;
  setQuizResult: (result: QuizResult | null) => void;
  widgetRef: RefObject<IWidget | null>;
  setWidgetRef: (ref: IWidget | null) => void;
};

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

export function CandidateProvider({ children }: { children: ReactNode }) {
  const [candidateData, setCandidateData] = useState<CandidateData | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [quizProgress, setQuizProgress] = useState<QuizProgressState | null>(null);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const session = JSON.parse(saved);
        if (session.candidateData?.candidateId && session.candidateData?.assessmentId) {
          setCandidateData(session.candidateData);
          setQuizResult(session.quizResult ?? null);
          setQuizProgress(session.quizProgress ?? null);
        }
      }
    } catch { sessionStorage.removeItem(STORAGE_KEY); }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (candidateData) sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ candidateData, quizResult, quizProgress }));
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) { console.error("Unable to save quiz session:", error); }
  }, [hydrated, candidateData, quizResult, quizProgress]);
  const widgetRef = useRef<IWidget | null>(null);

  const setWidgetRef = (widget: IWidget | null) => {
    widgetRef.current = widget;
  };

  const resetCandidateData = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setQuizProgress(null);
    setCandidateData(null);
    setQuizResult(null);
    widgetRef.current = null;
  };

  return (
    <CandidateContext.Provider
      value={{
        hydrated,
        quizProgress,
        setQuizProgress,
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