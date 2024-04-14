import json
from langchain_core.globals import set_debug
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from operator import itemgetter

from src.ai_interviewer.constants import INTERVIEW_PROMPT_TEMPLATE
from src.ai_interviewer.llm import LLMClient
from src.ai_interviewer.logger import AppLogger


class InterviewModel:
  def __init__(self, LLClient: LLMClient, logger: AppLogger):
    set_debug(True)
    self.llm = LLClient.llm
    self.logger = logger

    self.prompt = ChatPromptTemplate.from_template(INTERVIEW_PROMPT_TEMPLATE)

  def predict(self, skills: str):
    chain = (
      {"skills": itemgetter("skills")}
      | self.prompt
      | self.llm
      | StrOutputParser()
      | (lambda x: json.loads(x)))
    
    return chain.invoke({ "skills": skills })
