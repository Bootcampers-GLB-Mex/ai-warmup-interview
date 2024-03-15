import re
from typing import List, Optional, TypedDict

# from langchain.schema import Document
from pydantic import BaseModel
# from strenum import StrEnum

class FeedbackRequest(BaseModel):
  answer: str
