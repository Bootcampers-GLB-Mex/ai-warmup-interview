export interface Options {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  feedback: string;
  score: string;
}
export interface BoxFeedbackProps {
  options: Options[];
}
export function BoxFeedback({ options }: BoxFeedbackProps) {
  return (
    <div>
      {options.map((option) => (
        <div
          key={option.question}
          className="p-10 bg-white mb-4 shadow-lg cursor-pointer"
        >
          <div>
            <div className="pb-2 text-[#7C7C7C] text-xl">{option.question}</div>
            <div className="text-sm w-10/12">Your Answer: {option.userAnswer}</div>
            <div className="text-sm w-10/12">IA Answer: {option.correctAnswer}</div>
            <div className="text-sm w-10/12">Feedback: {option.feedback}</div>
            <div className="text-sm w-10/12">Score: {option.score}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
