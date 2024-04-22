import { TemplateQuestionDto } from 'src/firestore/data.dto';

export function getRandomElements(questions: TemplateQuestionDto[]) {
  const randomElements: TemplateQuestionDto[] = [];

  const filteredQuestions = questions.filter(
    (question) => question.skillLevel === 'Can perform without supervision',
  );
  const totalQuestions = filteredQuestions.length;
  const numElements = Math.min(totalQuestions, 5); // Ensure we don't exceed the number of available questions

  while (randomElements.length < numElements) {
    const randomIndex = Math.floor(Math.random() * totalQuestions);
    const randomQuestion = filteredQuestions[randomIndex];

    if (!randomElements.includes(randomQuestion)) {
      randomElements.push(randomQuestion);
    }
  }

  return randomElements;
}
