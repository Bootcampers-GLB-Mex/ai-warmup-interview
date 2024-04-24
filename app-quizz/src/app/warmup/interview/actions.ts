'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface QuestionResponse {
  id: string;
  question: string;
  context: string;
  answer?: string;
  feedback?: string;
  score?: string;
}

export interface InterviewResponse {
  id: string;
  title: string;
  status: string;
  role: string;
  level: string;
  questions: {questions: QuestionResponse[]};
}
export async function fetchData() {
  const cookieSession = cookies().get('session')?.value;
  const session = JSON.parse(atob(cookieSession!));
  const userId = session.user.uid;
  const response = await fetch(`http://localhost:3003/interviews/random`, {
    method: 'POST',
    body: JSON.stringify({
      userId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result: InterviewResponse = await response.json();
  return result;
}

export interface PostDataQuestion {
  questionId: string;
  question: string;
  answer: string;
}
export async function postData(
  questions: PostDataQuestion[],
  interviewId: string,
) {
  const cookieSession = cookies().get('session')?.value;
  const session = JSON.parse(atob(cookieSession!));
  const userId = session.user.uid;
  await fetch('http://localhost:3003/interviews/answers', {
    method: 'POST',
    body: JSON.stringify({
      questions,
      interviewId,
      userId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const fetchInterview = async (interviewId: string) => {
  const cookieSession = cookies().get('session')?.value;
  const session = JSON.parse(atob(cookieSession!));
  const userId = session.user.uid;
  const response = await fetch(`http://localhost:3003/interviews/interview-id?userId=${userId}&interviewId=${interviewId}`);
  const result: InterviewResponse = await response.json();
  if (result.status === "COMPLETED") {
    redirect('/warmup/interview/result');
  }
}
