from langchain_core.globals import set_debug
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from operator import itemgetter

from src.ai_interviewer.constants import FEEDBACK_PROMPT_TEMPLATE
from src.ai_interviewer.llm import LLMClient
from src.ai_interviewer.question_context_document import QuestionContextDocument
from src.ai_interviewer.logger import AppLogger


class InterviewerModel:
  def __init__(self, LLClient: LLMClient, logger: AppLogger):
    set_debug(True)
    self.llm = LLClient.llm
    self.logger = logger

    self.prompt = ChatPromptTemplate.from_template(FEEDBACK_PROMPT_TEMPLATE)

  def predict(self, answer: str, question: str, context: str, categories: list):
    chain = ({
      "answer": itemgetter("answer"),
      "context": itemgetter("context"),
      "categories": itemgetter("categories"),
    }
    | self.prompt
    | self.llm
    | StrOutputParser())
    return chain.invoke({"answer": answer, "context": [QuestionContextDocument.build_document(question, context, categories)], "categories": categories})

