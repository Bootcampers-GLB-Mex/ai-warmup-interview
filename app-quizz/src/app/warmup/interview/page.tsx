import { fetchData, postData } from "./actions";
import { QuizzForm } from "./components/quizz-form";
import { QuickQuizzProvider } from "./question/context";

export default async function Question() {
  const interview = await fetchData();
  return (
    <>
    <div className="md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-teal-100">
      <QuickQuizzProvider questions={interview.questions.questions}>
        <QuizzForm />
      </QuickQuizzProvider>
    </div>
    </>
  );
}
