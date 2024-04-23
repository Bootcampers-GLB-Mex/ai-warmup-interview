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
            <div className="pb-2 mb-3 text-[#7C7C7C] text-xl">{option.question}</div>
            <div className="text-sm mb-3 w-10/12"><span className="font-bold">Your Answer:</span> {option.userAnswer}</div>
            <div className="text-sm mb-3 w-10/12"><span className="font-bold">IA Answer:</span> {option.correctAnswer}</div>
            <div className="text-sm mb-3 w-10/12"><span className="font-bold">Feedback:</span> {option.feedback}</div>
            <div className="text-sm w-10/12"><span className="font-bold">Score:</span> {option.score}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
