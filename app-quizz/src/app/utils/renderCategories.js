import React, {useState} from "react";

export default function renderCategories() {
  const [inputs, setInputs] = useState([""]);

  const addInput = () => {
    setInputs(["", ...inputs]);
  };

  return (
    <div className="w-full flex-col" onClick={() => addInput()}>
      <p className="pt-4">Categories</p>
      <div className="flex justify-start items-end">
        <div className="flex-col w-80">
          {inputs.map((input, index) => (
            <input
              key={index}
              value={input}
              className="border rounded border-[#A7A7A7] mt-4 h-10 w-80"
            />
          ))}
        </div>

        <button className="mt-4 ml-2 " onClick={addInput}>
          <div>
            <div>
              <img src="/assets/SVG/AddIcon.svg" alt="Add Icon" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
