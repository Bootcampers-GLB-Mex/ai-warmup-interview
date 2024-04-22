import { fetchData, postData } from "./actions";
import { QuizzForm } from "./components/quizz-form";
import { QuickQuizzProvider } from "./question/context";

export default async function Question() {
  const interview = await fetchData("KSchtFol3eaEtLilJ3VJ");
  return (
    <>
    <div className="md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-teal-100">
      <QuickQuizzProvider questions={interview}>
        <QuizzForm />
      </QuickQuizzProvider>
    </div>
    </>
  );
}
