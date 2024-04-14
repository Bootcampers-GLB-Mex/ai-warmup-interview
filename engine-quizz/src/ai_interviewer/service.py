from .interviewer_model import InterviewerModel


class InterviewerService:
    def __init__(self, model: InterviewerModel):
        self.model = model

    def get_feedback(self, query: str):
        return self.model.predict(query)