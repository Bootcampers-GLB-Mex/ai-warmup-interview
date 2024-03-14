from .model import InterviewerModel


class InterviewerService:
    def __init__(self, model: InterviewerModel):
        self.model = model

    def predict(self, query: str):
        return self.model.predict(query)