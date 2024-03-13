"use client";

import Button from "../components/Button/button";

export default function StepFour() {
  const btnStyle='bg-white w-40 hover:text-teal-600 text-teal-900 font-semibold py-2 px-4 border border-teal-900 rounded-full hover:text-white';

  return (
    <>
    <div className="md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-teal-100">

      <div className="z-10 font-sans text-2xl text-teal-900 pl-10 pr-10 flex items-center justify-center">
        Choose Technologies:
      </div>

      <div className="flex flex-row text-l text-center pt-8 pb-8 pl-10 pr-10">
        <div className="basis-1/4 md:basis-1/3">
          <Button btnStyles={btnStyle} title='React' handlerEvent={()=>{}}></Button>
        </div>
        <div className="basis-1/4 md:basis-1/3">
          <Button btnStyles={btnStyle} title='Angular' handlerEvent={()=>{}}></Button>
        </div>
        <div className="basis-1/2 md:basis-1/3">
          <Button btnStyles={btnStyle} title='Vue' handlerEvent={()=>{}}></Button>
        </div>
      </div>

      <div className="flex flex-row text-l text-center pt-8 pb-8 pl-10 pr-10">
        <div className="basis-1/4 md:basis-1/3">
        </div>
        <div className="basis-1/4 md:basis-1/3">
          <Button btnStyles={btnStyle} title='Node Js' handlerEvent={()=>{}}></Button>
        </div>
        <div className="basis-1/2 md:basis-1/3">
          <Button btnStyles={btnStyle} title='React Native' handlerEvent={()=>{}}></Button>
        </div>
        <div className="basis-1/4 md:basis-1/3">
        </div>
      </div>

    </div>
    </>
  );
}
