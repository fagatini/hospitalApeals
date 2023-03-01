export type Appeal = {
    id: string;
    date: string;
    email?: string;
    illnessScore: number;
    name: string;
    phone: string;
    surname: string;
    symptomsList: string[];
    additionalSymptoms?: string;
    state:string;
  }