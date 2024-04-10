from langchain_openai import ChatOpenAI
from langchain_core.globals import set_debug
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.documents import Document
from src.ai_interviewer.constants import CONTEXT, PROMPT_TEMPALTE, CATEGORIES
from src.ai_interviewer.llm import LLMClient


class InterviewerModel:
  def __init__(self, LLClient: LLMClient):
    set_debug(True)
    self.llm = LLClient.llm

    prompt = ChatPromptTemplate.from_template(PROMPT_TEMPALTE)

    self.document_chain = create_stuff_documents_chain(self.llm, prompt)

  def predict(self, answer: str):
    response = self.document_chain.invoke({
      "answer": answer,
      "context": [Document(page_content=CONTEXT, page_title="S.O.L.I.D. Principles")],
      "categories": CATEGORIES
    })
    print(response)
    return response

