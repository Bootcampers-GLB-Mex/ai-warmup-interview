import json
from .interviewer_model import InterviewerModel
from .schema import FeedbackRequest
from src.logger import AppLogger
import requests

class InterviewerService:
  def __init__(self, model: InterviewerModel, logger: AppLogger):
    self.model = model
    self.logger = logger

  def get_feedback(self, feedback_req: FeedbackRequest):
    results = [ {
      "feedback": self.model.predict(answer=question.answer, question=question.question, context=question.compare_answer),
      "question_id": question.question_id
    } for question in feedback_req.questions]

    self.logger.info(f"Feedback Results: {results}")

    feedback = {
      "interviewId": feedback_req.interview_id,
      "userId": feedback_req.user_id,
      "feedback": [{
        "feedback": result["feedback"]["feedback"],
        "score": result["feedback"]["score"],
        "questionId": result["question_id"]
      } for result in results]
    }

    self.logger.info(f"Feedback Request: {feedback}")
    
    requests.post('http://localhost:3003/feedback', data=json.dumps(feedback), headers={'Content-Type': 'application/json'})