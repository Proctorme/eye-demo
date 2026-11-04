"use client";

import { useEffect, useState } from "react";
import {
  CandidateModal,
  type CandidateData,
} from "@/components/candidate-modal";
import { useCandidateContext } from "@/lib/candidate-context";
import { useRouter } from "next/navigation";
import { registerWidgetEvents } from "@/lib/widget-events";
import { getWidgetConfig } from "@/lib/widget-config";

export default function RegistrationPage() {
  const { setCandidateData, setWidgetRef, setQuizProgress, setQuizResult } =
    useCandidateContext();
  const router = useRouter();
  const [status, updateStatus] = useState("Not Started");

  // Prepare the quiz route while the candidate completes the widget checks.
  useEffect(() => {
    router.prefetch("/quiz");
  }, [router]);

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
    // Collect form data
    const candidateId =
      data.candidateId.trim() ||
      getCandidateId() ||
      Math.random().toString(36).substring(2, 10);

    const assessmentId =
      data.assessmentId.trim() ||
      getAssessmentId() ||
      Math.random().toString(36).substring(2, 10);

    try {
      const widget = await window.LoadEyeWidget?.();
      if (!widget) {
        console.error("Failed to load the proctoring widget.");
        return;
      }
      setWidgetRef(widget);
      registerWidgetEvents(widget, {
        onStarted: () => {
          setQuizProgress(null);
          setQuizResult(null);
          setCandidateData({ ...data, candidateId, assessmentId });
          router.push("/quiz");
          updateStatus("Started");
        },
        onEnded: () => updateStatus("Finished"),
      });

      const config = getWidgetConfig({ ...data, candidateId, assessmentId });

      updateStatus("Initializing...");
      widget.init(config);

      updateStatus("Initialized");
    } catch (error) {
      console.error("Error initializing widget:", error);
    }
  };

  return (
    <div className="relative">
      <CandidateModal onSubmit={handleStartQuiz} />
    </div>
  );
}
