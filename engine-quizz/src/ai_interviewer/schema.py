from typing import List
from pydantic import BaseModel

class Question(BaseModel):
  question: str
  question_id: str
  answer: str
  compare_answer: str

class FeedbackRequest(BaseModel):
  questions: List[Question]
  interview_id: str
  user_id: str

class Feedback():
  feedback: str
  score: str
  question_id: str

class FeedbackResponse:
  interview_id: str
  user_id: str
  feedback: List[Feedback]