'use client'

import Button from "@/components/Button/button";
import { useQuickQuizz } from "../question/context";
import { use, useEffect, useState } from "react";
import { PostDataQuestion, QuestionResponse, postData } from "../actions";

const btnStyle = "text-white-900  bg-white border border-teal-900 focus:outline-none hover:text-white rounded"

export const QuizzForm = () => {
  const {
    currentQuestion,
    questions,
    answers,
    isFinalQuestion,

    setAnswers,
    setCurrentQuestion,
  } = useQuickQuizz();

  const [userAnswer, setUserAnswer] = useState("")

  const onNextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setAnswers([...answers, userAnswer]);
      return;
    }
    if (answers.length > currentQuestion) {
      const _answers = answers.map((a, i) => {
        if (i === currentQuestion) {
          return userAnswer;
        }
        return a;
      });
      setAnswers(_answers);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const _answers = [...answers, userAnswer];
      setAnswers(_answers);
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  const onBack = () => {
    setCurrentQuestion(currentQuestion - 1);
  }

  const requestFeedback = (answers: string[], questions: QuestionResponse[]) => {
    const answersPostData: PostDataQuestion[] = answers.map((answer, index) => {
      return {
        questionId: questions[index].id,
        question: questions[index].question,
        answer: answer,
      };
    });
    postData(answersPostData, 'KSchtFol3eaEtLilJ3VJ', 'oCOsUxCdN0p2O5WAYGWS')
  };

  const onEndForm = () => {
    requestFeedback([...answers, userAnswer], questions)
  }

  useEffect(() => {
    setUserAnswer(answers[currentQuestion] || "");
  }, [currentQuestion]);

  console.log('here', questions)

  return (
    <div>
      <div className="font-sans text-sm text-gray-400 pt-1 pb-1 pl-10 pr-10 flex items-center justify-end">
        {currentQuestion + 1}/{questions.length}
      </div>
      <div className="z-10 font-sans pt-1 pb-1 text-l text-white-900 pl-10 pr-10 flex items-center justify-center">
        {questions[currentQuestion].question}
      </div>

      <div className="flex flex-row text-l text-center pt-8 pb-8 pl-10 pr-10">
        <textarea
          className="peer h-full min-h-[300px] rounded-lg resize-none w-full p-2 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200"
          placeholder="Write your answer here..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        ></textarea>
      </div>

      <div className="flex flex-row text-l pt-8 pb-8 pl-10 pr-10 justify-end">
        <Button className={btnStyle} onClick={onBack}>Back</Button>
        <Button onClick={!isFinalQuestion ? onNextQuestion : onEndForm}>Next</Button>
      </div>
    </div>
  )
};
