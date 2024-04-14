from typing import List
from pydantic import BaseModel

class FeedbackRequest(BaseModel):
  answer: str
  question: str
  context: str
  categories: List[str]
