import type { CandidateData } from "./candidate-context";

export function getWidgetConfig(data: CandidateData) {
  return {
    apiKey: data.apiKey,
    assessmentId: data.assessmentId,
    candidateId: data.candidateId,
    assessmentTitle: "Eye demo Assessment",
    candidateEmail: "test@proctorme.online",
    candidateFirstName: data.firstName,
    candidateLastName: data.lastName,
    candidateImageUrl: data.imageUrl,
    institutionName: "Tech Academy International",
    examDuration: 300,
    features: { facialRecognition: data.enableFacialRecognition },
  };
}
