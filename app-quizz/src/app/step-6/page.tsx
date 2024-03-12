"use client";

import React from "react";

const options = [
  {
    id: 1,
    title: "What is Scope?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
  {
    id: 2,
    title: "What is Closure?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
  {
    id: 3,
    title: "What is Scope?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
];

export default function StepSix() {
  const handleClick = (option: number) => {
    console.log("option ", option);
  };

  const handleButton = () => {
    console.log("click");
  };

  function renderOptions() {
    return options.map((option) => (
      <div
        key={option.id}
        className="p-10 bg-white mb-4 shadow-lg cursor-pointer"
        onClick={() => handleClick(option.id)}
      >
        <div className="pb-2 text-[#7C7C7C] text-xl">{option.title}</div>
        <div className="text-sm w-10/12">{option.description}</div>
      </div>
    ));
  }

  return (
    <>
      <div className="md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-teal-100 pb-20">
        <div className="z-10 font-sans text-2xl text-teal-900 pl-10 pr-10 flex items-center justify-center text-5xl">
          Check your score!
        </div>
        <div className="text-center  pt-8 text-2xl text-[#5C5C5C]">
          Et magnam aspernatur et iusto voluptatem non nostrum nulla quo dolore
          ducimus
        </div>
        <div className="flex flex-column  pt-8 pb-8 pl-10 pr-10">
          <div>
            <div>{renderOptions()}</div>
          </div>
        </div>
        <div>
          <button
            className=" float-right cursor-pointer bg-[#003332] text-white pt-3 pb-3 pl-6 pr-6 mr-8 rounded"
            onClick={() => handleButton()}
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
}
