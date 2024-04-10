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
        

        prompt = PROMPT_TEMPALTE
        
        chatgpt = self.llm
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
              
              data = {"categories": categories, "context": context}
           
              prompt_temp_sistema = PromptTemplate(
                template= prompt,
                input_variables=["answer"],
                partial_variables=data
              )

              template_sistema = SystemMessagePromptTemplate(prompt=prompt_temp_sistema)
              prompt_temp_humano = PromptTemplate(template="{question}", input_variables=["question"])
              template_humano = HumanMessagePromptTemplate(prompt=prompt_temp_humano)
              chat_prompt = ChatPromptTemplate.from_messages([template_sistema, template_humano])
              chat_prompt_value = chat_prompt.format_prompt(answer=answer, question=question)
              evaluacion = chatgpt.invoke(chat_prompt_value)

        else:
            print("La estructura del JSON no es la esperada.")  
      
        for key, value in evaluacion:
            if key == 'content':
                content_value = value
                break  

            
            print(content_value)
        return content_value


