"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { registerWidgetEvents } from "@/lib/widget-events";
import { getWidgetConfig } from "@/lib/widget-config";
import type { IWidget } from "@/global";
import { QuizContainer } from "@/components/quiz-container";
import { useCandidateContext } from "@/lib/candidate-context";

export default function QuizPage() {
  const { hydrated, candidateData, quizResult, quizProgress, setQuizResult, widgetRef } = useCandidateContext();
  const router = useRouter();

  const [widgetReady, setWidgetReady] = useState(false);
  const [resumeError, setResumeError] = useState(false);
  const resumeAttempt = useRef<Promise<IWidget> | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (!candidateData) { router.replace("/register"); return; }
    if (quizResult) { router.replace("/results"); return; }
    if (widgetRef.current && !resumeAttempt.current) { setWidgetReady(true); return; }
    if (quizProgress && quizProgress.deadline <= Date.now()) { setWidgetReady(true); return; }
    let cancelled = false;
    // The script loads after hydration. Wait for its loader before restoring
    // the same session, as the forms application's useEyeProctor does.
    if (!resumeAttempt.current) {
      resumeAttempt.current = (async () => {
        const timeout = Date.now() + 15_000;
        while (!window.LoadEyeWidget) {
          if (Date.now() >= timeout) throw new Error("Widget script did not load");
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        const widget = await window.LoadEyeWidget();
        widgetRef.current = widget;
        // Restore event listeners without the registration callback that
        // clears quiz progress and navigates to a fresh attempt.
        registerWidgetEvents(widget);
        await widget.init(getWidgetConfig(candidateData));
        return widget;
      })();
    }
    resumeAttempt.current.then(() => {
      if (!cancelled) setWidgetReady(true);
    }).catch(error => {
      console.error("Unable to restore proctoring:", error);
      if (!cancelled) setResumeError(true);
    });
    return () => { cancelled = true; };
  }, [hydrated, candidateData, quizResult, router, widgetRef]);

  const handleQuizComplete = (score: number, totalQuestions: number, timeUsed: number) => {
    // Store the quiz result in context
    setQuizResult({ score, totalQuestions, timeUsed });
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

  if (!hydrated || !candidateData || quizResult) {
    return null; // Or a loading state
  }

  if (!widgetReady) return <main className="assessment-stage"><div className="assessment-card p-8 text-center">
    <p role={resumeError ? "alert" : "status"}>{resumeError ? "Unable to reconnect proctoring. Reload to try again." : "Reconnecting your proctoring session…"}</p>
    {resumeError && <button className="assessment-button mt-4" onClick={() => window.location.reload()}>Retry</button>}
  </div></main>;

  return (
    <QuizContainer
      onComplete={handleQuizComplete}
    />
  );
}
