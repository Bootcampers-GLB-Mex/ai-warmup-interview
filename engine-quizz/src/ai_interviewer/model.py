from langchain_openai import ChatOpenAI
from langchain_core.globals import set_debug
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.documents import Document
from src.ai_interviewer.constants import CONTEXT, PROMPT_TEMPALTE, CATEGORIES
from src.ai_interviewer.llm import LLMClient
from langchain.chains import RetrievalQA, RetrievalQAWithSourcesChain
import numpy as np
import time
import json

class InterviewerModel:
    def __init__(self, LLClient: LLMClient):
        set_debug(True)
        self.llm = LLClient.llm
        prompt = ChatPromptTemplate.from_template(PROMPT_TEMPALTE)
        self.document_chain = create_stuff_documents_chain(self.llm, prompt)
    
      
    def predict(self, interview):

        from langchain.chains import RetrievalQA, RetrievalQAWithSourcesChain
        from langchain_openai import ChatOpenAI 
        from langchain.prompts import PromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate
        ntrvst = json.loads(interview.json())
        if 'interview' in ntrvst and isinstance(ntrvst['interview'], list):
        
            for interview in ntrvst['interview']:
              context = interview['context']
              question = interview['question']
              categories = interview['categories']
              answer = interview['answer']
                    
              print("Question:", question)
              print("Categories:", ", ".join(categories))
              print("Answer:", answer)
              print("Context:", context)
              print("---")

              docs = [
                    Document(page_content=context)
              ]
              
              evaluation = self.document_chain.invoke({"categories": categories, "context": docs, "answer": answer, "question": question})

        else:
            print("La estructura del JSON no es la esperada.")  
      
            
        print(evaluation)
        return evaluation


