import { cookies } from "next/headers";
import { InterviewResponse } from "../interview/actions";


export interface QuestionResponse {
  title: string;
  feedback: string;
  score: string;
  question: string;
  context: string;
  userAnswer: string;
}
export async function fetchFeedback(interviewId: string): Promise<QuestionResponse[]> {
  const cookieSession = cookies().get('session')?.value;
  const session = JSON.parse(atob(cookieSession!));
  const userId = session.user.uid;
  const response = await fetch(
    `http://localhost:3003/interviews/interview-id?userId=${userId}&interviewId=${interviewId}`
  );
  const result: InterviewResponse = await response.json();
  const feedback = result.questions.questions.map((question) => {
    return {
      title: question.question,
      feedback: question.feedback,
      score: question.score,
      question: question.question,
      context: question.context,
      userAnswer: question.answer,
    } as QuestionResponse;
  });
  return feedback;
}