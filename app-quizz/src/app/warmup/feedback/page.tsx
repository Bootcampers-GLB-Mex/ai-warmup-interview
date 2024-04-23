import { BoxFeedback, Options } from "./components/BoxFeedback";
import { fetchFeedback } from "./actions";

const bodyContainerStyles =
    "md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-gray-50 pb-20";
export default async function Feedback() {
  const feedbacks = await fetchFeedback("oCOsUxCdN0p2O5WAYGWS", "KSchtFol3eaEtLilJ3VJ")
  const options = feedbacks.map((feedback) => {
    return {
      question: feedback.question,
      userAnswer: feedback.userAnswer,
      correctAnswer: feedback.context,
      feedback: feedback.feedback,
      score: feedback.score,
    } as Options;
  });
  return (
    <>
      <div className={bodyContainerStyles}>
        <div className="z-10 font-sans text-white-900 pl-10 pr-10 flex items-center justify-center text-5xl">
          Check your score!
        </div>
        <div className="flex flex-column  pt-8 pb-8 pl-10 pr-10">
          <BoxFeedback options={options} />
        </div>
        {/* <div className="float-right pr-10">
          <Button
            title="Download"
            onClick={() => handlerButton()}
          ></Button>
        </div> */}
      </div>
    </>
  );
}

