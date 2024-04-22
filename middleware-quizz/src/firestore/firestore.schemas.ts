export type InterviewLevel = 'junior' | 'mid' | 'senior';
export type InterviewStatus = 'active' | 'inactive';

export interface UserInterviewQuestionFirestore {
  question_id: string;
  question: string;
  context: string;
  answer?: string;
  feedback?: string;
  score?: string;
}

export interface UserInterviewFirestore {
  interview_id: string;
  level: InterviewLevel;
  role: string;
  status: InterviewStatus;
  title: string;
  questions: UserInterviewQuestionFirestore[];
}

export interface UserFirestore {
  email: string;
  first_name: string;
  last_name: string;
  interviews: UserInterviewFirestore[];
}

export interface InterviewQuestionFirestore {
  answer: string;
  dev_level: string;
  question: string;
  skill_level: string;
  skill_name: string;
}

export interface InterviewFirestore {
  title: string;
  questions: InterviewQuestionFirestore[];
}
