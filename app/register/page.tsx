"use client";

import { useRef, useState } from "react";
import { CandidateModal, type CandidateData } from "@/components/candidate-modal";
import { useCandidateContext } from "@/lib/candidate-context";
import { useRouter } from "next/navigation";
import { IWidget } from "@/global";

export default function RegistrationPage() {
  const { setCandidateData, setWidgetRef } = useCandidateContext();
  const router = useRouter();
  const [status, updateStatus] = useState("Not Started");

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

      // Add event listeners first
      widget.on("STARTED", () => {
        console.log("Widget started ▶️");
        setCandidateData({...data, candidateId, assessmentId });
        router.push("/quiz");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <CandidateModal onSubmit={handleStartQuiz} />
    </div>
  );
}