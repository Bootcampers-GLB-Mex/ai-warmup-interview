import re
from typing import List, Optional, TypedDict


# from langchain.schema import Document
from pydantic import BaseModel
# from strenum import StrEnum


class Evaluation(BaseModel):
    question: str
    categories: List[str]
    answer: str

class FeedbackRequest(BaseModel):
  entrevista: List[Evaluation]
