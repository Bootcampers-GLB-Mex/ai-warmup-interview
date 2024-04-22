
import { QuickQuizzProvider } from "../context";
import { QuizzForm } from "../../components/quizz-form";
import { fetchData } from "../../actions";

interface QuestionProps {
  params: {
    id: string;
  }
}
export default async function Question({ params }: QuestionProps) {
  const interview = await fetchData("KSchtFol3eaEtLilJ3VJ");
  return (
    <>
    <div className="md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-teal-100">
    <QuickQuizzProvider>
      <QuizzForm qPosition={1} totalQuestions={5} question="What is the difference between a variable that is: null, undefined or undeclared?" />
    </QuickQuizzProvider>
    </div>
    </>
  );
}
