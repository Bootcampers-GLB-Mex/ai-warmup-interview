export default function renderQuestion(question, handleClick) {
  return (
    <form action="/" className="flex flex-col ">
      <label htmlFor={question} className="pb-4">
        {question}
      </label>
      <input
        className="border rounded border-[#A7A7A7] h-10 w-80"
        type="text"
        id={question}
        name={question}
        onChange={() => handleClick(option.id)}
      />
    </form>
  );
}
