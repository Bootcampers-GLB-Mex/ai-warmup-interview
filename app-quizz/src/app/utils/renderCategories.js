import React, {useState} from "react";

export default function renderCategories() {
  const [inputs, setInputs] = useState([""]);

  const addInput = () => {
    setInputs(["", ...inputs]);
  };

  const addCategoryIcon = (
    <div>
      <svg
        width="45"
        height="45"
        viewBox="0 0 80 80"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_652_130)">
          <path
            d="M40 6.6665C21.6 6.6665 6.66666 21.5998 6.66666 39.9998C6.66666 58.3998 21.6 73.3331 40 73.3331C58.4 73.3331 73.3333 58.3998 73.3333 39.9998C73.3333 21.5998 58.4 6.6665 40 6.6665ZM56.6666 43.3332H43.3333V56.6665H36.6666V43.3332H23.3333V36.6665H36.6666V23.3332H43.3333V36.6665H56.6666V43.3332Z"
            fill="#1DE4CB"
          />
        </g>
        <defs>
          <clipPath id="clip0_652_130">
            <rect width="80" height="80" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );

  return (
    <div className="w-full flex-col" onClick={() => addInput()}>
      <p className="pt-4">Categories</p>
      <div className="flex justify-start items-end">
        <div className="flex-col w-80">
          {" "}
          {inputs.map((input, index) => (
            <input
              key={index}
              value={input}
              className="border rounded border-[#A7A7A7] mt-4 h-10 w-80"
            />
          ))}
        </div>

        <button className="mt-4 ml-2 " onClick={addInput}>
          {" "}
          {addCategoryIcon}
        </button>
      </div>
    </div>
  );
}
