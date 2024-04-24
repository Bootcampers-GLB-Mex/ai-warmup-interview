'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { QuestionResponse } from "./actions";

interface QuickQuizzContextValue {
  currentQuestion: number;
  interviewId: string;
  isFinalQuestion: boolean;
  setCurrentQuestion: (question: number) => void;
  questions: QuestionResponse[];
  setQuestions: (questions: QuestionResponse[]) => void;
  answers: string[];
  setAnswers: (answers: string[]) => void;
}
const QuickQuizzContext = createContext<QuickQuizzContextValue>({
  currentQuestion: 0,
  interviewId: '',
  isFinalQuestion: true,
  setCurrentQuestion: () => {},
  questions: [],
  setQuestions: () => {},
  answers: [],
  setAnswers: () => {},
});

export const useQuickQuizz = () => {
  return useContext(QuickQuizzContext);
};
export interface QuickQuizzProviderProps {
  questions: QuestionResponse[];
  interviewId: string;
  children: React.ReactNode;
}
export const QuickQuizzProvider = ({ children, questions, interviewId }: QuickQuizzProviderProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tQuestions, setQuestions] = useState<QuestionResponse[]>(questions);
  const [answers, setAnswers] = useState<string[]>([]);

  const wrapSetCurrentQuestion = (question: number) => {
    if (question < 0) {
      setCurrentQuestion(0);
    } else if (question >= tQuestions.length) {
      setCurrentQuestion(tQuestions.length - 1);
    } else {
      setCurrentQuestion(question);
    }
  }

  const wrapSetQuestions = (questions: QuestionResponse[]) => {
    setQuestions(questions);
    setCurrentQuestion(0);
  }

  const wrapSetAnswers = (answers: string[]) => {
    setAnswers(answers);
  }

  useEffect(() => {
    wrapSetQuestions(questions);
  }, [questions.length])

  return (
    <QuickQuizzContext.Provider value={{
      currentQuestion,
      interviewId,
      isFinalQuestion: tQuestions.length === currentQuestion + 1,
      setCurrentQuestion: wrapSetCurrentQuestion,
      questions: tQuestions,
      setQuestions: wrapSetQuestions,
      answers,
      setAnswers: wrapSetAnswers,
    }}>
      {children}
    </QuickQuizzContext.Provider>
  );
};

export default QuickQuizzContext;