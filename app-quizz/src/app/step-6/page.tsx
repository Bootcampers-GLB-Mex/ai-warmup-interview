"use client";

import React from "react";
import renderBoxOptions from "../utils/renderBoxOptions";
import options from "../data/responses";
import Button from "../components/Button/button";

export default function StepSix() {
  const bodyContainerStyles =
    "md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-teal-100 pb-20";

  const handleClick = (option: number) => {
    console.log("option ", option);
  };

  const handleButton = () => {
    console.log("click");
  };

  return (
    <>
      <div className={bodyContainerStyles}>
        <div className="z-10 font-sans text-2xl text-teal-900 pl-10 pr-10 flex items-center justify-center text-5xl">
          Check your score!
        </div>
        <div className="text-center  pt-8 text-2xl text-[#5C5C5C]">
          Et magnam aspernatur et iusto voluptatem non nostrum nulla quo dolore
          ducimus
        </div>
        <div className="flex flex-column  pt-8 pb-8 pl-10 pr-10">
          <div>
            <div>{renderBoxOptions(options, handleClick)}</div>
          </div>
        </div>
        <div className="float-right pr-10">
          <Button title="Download" function={() => handleButton()}></Button>
        </div>
      </div>
    </>
  );
}
