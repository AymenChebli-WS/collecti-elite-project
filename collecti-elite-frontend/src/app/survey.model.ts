export interface Survey {
  surveyId?: number; // Add an optional id property if you want to track the survey ID
  userId: number;
  schema: string;
  createdAt: string;
}

export interface SurveyResponse {
  reponseId?: number;
  surveyId: number;
  userId: number;
  responseSchema: string;
}

export interface Option {
  id?: number; // Add an optional id property if you want to track the option ID
  text: string;
}
