
"use client";

import Button from "@/app/components/Button/button";

export default function Question({params}) {
  let questionNumber = params?.question?.split('-');
  questionNumber = questionNumber[1] ? questionNumber[1] : 0;

  const btnStyle = "text-teal-900  bg-white border border-teal-900 focus:outline-none hover:text-white rounded"
  return (
    <>
    <div className="md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-teal-100">
      <div className="font-sans text-sm text-gray-400 pt-1 pb-1 pl-10 pr-10 flex items-center justify-end">
        {questionNumber}/10
      </div>
      <div className="z-10 font-sans pt-1 pb-1 text-xl text-teal-900 pl-10 pr-10 flex items-center justify-center">
        Aut debitis voluptatem non aliquam fuga qui error.      
      </div>
      <div className="z-10 font-sans pt-1 pb-1 text-l text-teal-900 pl-10 pr-10 flex items-center justify-center">
        Aut debitis voluptatem non aliquam fuga qui error voluptatum qui neque veniam. Et magnam aspernatur et iusto voluptatem non nostrum nulla quo dolore ducimus et vero placeat?
      </div>

      <div className="flex flex-row text-l text-center pt-8 pb-8 pl-10 pr-10">
        <textarea className="peer h-full min-h-[300px] rounded-lg resize-none w-full p-2 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200" placeholder="Write your answer here..."></textarea>
      </div>

      <div className="flex flex-row text-l pt-8 pb-8 pl-10 pr-10 justify-end">
        <Button btnStyles={btnStyle} handlerEvent={() => {}} title='Exit'></Button>
        <Button handlerEvent={() => {}} title='Next'></Button>
      </div>
    </div>
    </>
  );
}
