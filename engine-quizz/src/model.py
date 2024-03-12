from langchain_openai import ChatOpenAI
from langchain_core.globals import set_debug
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.documents import Document
from src.ai_interviewer.constants import CONTEXT, PROMPT_TEMPALTE, CATEGORIES


class InterviewerModel:
  def __init__(self):
    set_debug(True)
    llm = ChatOpenAI(
      openai_api_key=OPEN_API_KEY, # needs to be loaded at the begining
      model_name="gpt-3.5-turbo-0125",
      temperature=0)

    prompt = ChatPromptTemplate.from_template(PROMPT_TEMPALTE)

    self.document_chain = create_stuff_documents_chain(llm, prompt)

  def predict(self, answer: str):
    response = self.document_chain.invoke({
      "answer": answer,
      "context": [Document(page_content=CONTEXT, page_title="S.O.L.I.D. Principles")],
      "categories": CATEGORIES
    })
    print(response)
    return response

