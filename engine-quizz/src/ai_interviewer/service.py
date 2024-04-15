from .interviewer_model import InterviewerModel


class InterviewerService:
    def __init__(self, model: InterviewerModel):
        self.model = model

    def get_feedback(self, answer: str, question: str, context: str):
        return self.model.predict(answer=answer, question=question, context=context)