export interface Direction {
  id: number;
  name: string;
  grades: number[];
  preferredGrades?: number[];
  description: string;
  link: string;
  tags: {
    creativity: number;
    technology: number;
    visual: number;
    artistic: number;
    logical: number;
    practical: number;
    competition: number;
    presentation: number;
  };
}

export interface QuestionOption {
  value: string | number;
  label: string;
  tags?: {
    [key: string]: number;
  };
}

export interface Question {
  id: number;
  type: string;
  required?: boolean;
  question: string;
  multiple?: boolean;
  options: QuestionOption[];
}

export interface QuizAnswer {
  questionId: number;
  value: string | number;
}

export interface DirectionScore {
  direction: Direction;
  score: number;
  maxPossibleScore: number;
  percentage: number;
}
