export {};
interface IParamsConfig {
  apiKey: string;
  assessmentId: string;
  assessmentTitle?: string;
  candidateId?: string;
  candidateEmail?: string;
  candidateFirstName?: string;
  candidateLastName?: string;
  institutionName?: string;
  examDuration: number;
  candidateImageUrl?: string;
  features?: {
    aiProctoring?: boolean;
    facialRecognition?: boolean;
  };
  containerId?: string;
  origin?: string;
}

export interface IWidget {
  init: (config: IParamsConfig) => Promise<void>;
  on: (event: string, callback: (data?: unknown) => void) => void;
  endProctoring: () => void;
}
declare global {
  interface Window {
    LoadProctormeWidget?: () => Promise<IWidget>;
  }
}
