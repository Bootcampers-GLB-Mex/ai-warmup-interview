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
  const response = await fetch(
    `http://localhost:3003/interviews/random`, {
      method: "POST",
      body: JSON.stringify({
        userId: "oCOsUxCdN0p2O5WAYGWS"
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
  userId: string,
){
  await fetch("http://localhost:3003/interviews/answers", {
    method: "POST",
    body: JSON.stringify({
      questions,
      interviewId,
      userId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}