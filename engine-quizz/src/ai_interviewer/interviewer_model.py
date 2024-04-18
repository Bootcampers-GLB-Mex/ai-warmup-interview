from langchain_core.globals import set_debug
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from operator import itemgetter
import json

from src.constants import FEEDBACK_PROMPT_TEMPLATE
from src.llm import LLMClient
from src.logger import AppLogger
from src.ai_interviewer.question_context_document import QuestionContextDocument


class InterviewerModel:
  def __init__(self, LLClient: LLMClient, logger: AppLogger):
    set_debug(True)
    self.llm = LLClient.llm
    self.logger = logger

    self.prompt = ChatPromptTemplate.from_template(FEEDBACK_PROMPT_TEMPLATE)

  def predict(self, answer: str, question: str, context: str):
    chain = ({
      "answer": itemgetter("answer"),
      "context": itemgetter("context"),
      "question": itemgetter("question")
    }
    | self.prompt
    | self.llm
    | StrOutputParser()
    | (lambda x: json.loads(x)))
  
    return chain.invoke({"answer": answer, "question": question, "context": [QuestionContextDocument.build_document(question, context)]})

