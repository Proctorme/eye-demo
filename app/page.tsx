"use client";

import { useRef, useState } from "react";
import { CandidateModal } from "@/components/candidate-modal";
import { QuizContainer } from "@/components/quiz-container";
import { ResultsScreen } from "@/components/results-screen";
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

type AppState = "registration" | "quiz" | "results";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("registration");
  const [candidateData, setCandidateData] = useState<CandidateData | null>(
    null
  );
  const widgetRef = useRef<IWidget>(null);
  const [status, updateStatus] = useState("Not Started");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  function refreshWithCandidateId() {
    const candidateId = Math.random().toString(36).substring(2, 10);
    const assessmentId = Math.random().toString(36).substring(2, 10);
    const url = new URL(window.location.href);
    url.searchParams.set("candidateId", candidateId);
    url.searchParams.set("assessmentId", assessmentId);
    window.location.href = url.toString();
  }
  // helper to get candidateId from URL
  function getCandidateId() {
    return new URLSearchParams(window.location.search).get("candidateId");
  }
  function getAssessmentId() {
    return new URLSearchParams(window.location.search).get("assessmentId");
  }
  const handleStartQuiz = async (data: CandidateData) => {
    try {
      const widget = await window.LoadProctormeWidget?.();
      if (!widget) {
        console.error("Failed to load the proctoring widget.");
        return;
      }
      widgetRef.current = widget;
      // Collect form data
      const candidateId =
        data.candidateId ||
        getCandidateId() ||
        Math.random().toString(36).substring(2, 10);

      const assessmentId =
        data.assessmentId ||
        getAssessmentId() ||
        Math.random().toString(36).substring(2, 10);      
      // Add event listeners first
      widget.on("STARTED", () => {
        console.log("Widget started ▶️");
        setCandidateData({...data, candidateId, assessmentId });
        setAppState("quiz");
        updateStatus("Started");
      });

      widget.on("FACE_ABSENCE", (data) => {
        console.log(" face absence 🙈", data);
      });
      widget.on("TAB_NOT_FOCUS", (data) => {
        console.log(" tab not focus 💻", data);
      });
      widget.on("MULTIPLE_FACE", (data) => {
        console.log(" multiple face 🧑‍🧒‍🧒", data);
      });
      widget.on("SOUND_DETECTED", (data) => {
        console.log(" sound detected 🎶", data);
      });
      widget.on("PERIODIC_SNAPSHOT", (data) => {
        console.log(" periodic snapshot 📸", data);
      });

      widget.on("END_PROCTORING", () => {
        console.log("Widget finished proctoring ⛔️");
        updateStatus("Finished");
      });



      const config = {
        apiKey: data.apiKey,
        assessmentId,
        candidateId,
        assessmentTitle: "Test Assessment",
        candidateEmail: "test@proctorme.online",
        candidateFirstName: data.firstName,
        candidateLastName: data.lastName,
        candidateImageUrl: data.imageUrl,
        institutionName: "Tech Academy International",
        examDuration: 300,
        features: {
          facialRecognition: data.enableFacialRecognition,
        },
      };

      console.log("Initializing widget with config:", config);
      updateStatus("Initializing...");
      widget.init(config);

      updateStatus("Initialized");
    } catch (error) {
      console.error("Error initializing widget:", error);
    }
  };

  const handleQuizComplete = (finalScore: number, total: number) => {
    setScore(finalScore);
    setTotalQuestions(total);
    widgetRef.current?.endProctoring();
    setAppState("results");
  };

  const handleRetry = () => {
    setAppState("registration");
    setCandidateData(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {appState === "registration" && (
        <CandidateModal onSubmit={handleStartQuiz} />
      )}
      {appState === "quiz" && candidateData && (
        <QuizContainer
          candidateData={candidateData}
          onComplete={handleQuizComplete}
        />
      )}
      {appState === "results" && candidateData && (
        <ResultsScreen
          score={score}
          totalQuestions={totalQuestions}
          candidateData={candidateData}
          onRetry={handleRetry}
        />
      )}
    </main>
  );
}
