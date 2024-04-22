export interface QuestionResponse {
  question: string;
  devLevel: string;
  skillLevel: string;
  skillName: string;
  answer: string;
}

export interface InterviewResponse {
  id: string;
  title: string;
  questions: QuestionResponse[];
}
export async function fetchData(interviewId: string) {
  const response = await fetch(
    `http://localhost:3003/interviews/template/interview-id?interviewId=${interviewId}`
  );
  const result: InterviewResponse = await response.json();

  const getRandomElements = (result: InterviewResponse): QuestionResponse[] => {
    const randomElements: QuestionResponse[] = [];

    const questions = result.questions.filter((question) => question.skillLevel === 'Can perform without supervision');
    const totalQuestions = questions.length;
    const numElements = Math.min(totalQuestions, 5); // Ensure we don't exceed the number of available questions
    
    while (randomElements.length < numElements) {
      const randomIndex = Math.floor(Math.random() * totalQuestions);
      const randomQuestion = questions[randomIndex];

      if (!randomElements.includes(randomQuestion)) {
        randomElements.push(randomQuestion);
      }
    }

    return randomElements;
  };

  const randomQuestions = getRandomElements(result);
  return randomQuestions;
}

export interface PostDataQuestion {
  question: string;
  devLevel: string;
  skillLevel: string;
  skillName: string;
  compareAnswer: string;
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