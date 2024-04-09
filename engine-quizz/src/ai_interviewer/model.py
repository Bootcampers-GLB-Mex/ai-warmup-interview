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

def generate_chunks():
    from langchain.text_splitter import RecursiveCharacterTextSplitter
    from langchain.text_splitter import CharacterTextSplitter  
    
    
    text = CONTEXT
    text_splitter = CharacterTextSplitter(chunk_size = 250, chunk_overlap=25, separator='', strip_whitespace=False)
    fragmentos = text_splitter.create_documents([text])
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=250, chunk_overlap=25)
    texts = text_splitter.split_documents(fragmentos)
    
    
    for i, text_chunk in enumerate(texts):
        print(f"Chunk {i+1}:\n{text_chunk}\n---\n")
    
    
    return texts
    
def create_vectors(index_name, fragmentados):
    
    from langchain_openai import OpenAIEmbeddings
    from langchain_community.vectorstores import FAISS
    import os
    
    os.environ["OPENAI_API_KEY"] = ""
    embeddings = OpenAIEmbeddings(openai_api_key = "")
    db = FAISS.from_documents(fragmentados, embeddings)
        
    return db

    


class InterviewerModel:
    def __init__(self, LLClient: LLMClient):
        set_debug(True)
        self.llm = LLClient.llm
        prompt = ChatPromptTemplate.from_template(PROMPT_TEMPALTE)
        self.document_chain = create_stuff_documents_chain(self.llm, prompt)
    

    
    def generate_feedback(self, vectors, question, categories, answer):
      
        from langchain.chains import RetrievalQA, RetrievalQAWithSourcesChain
        from langchain_openai import ChatOpenAI 
        prompt = ChatPromptTemplate.from_template(PROMPT_TEMPALTE)
        
        data = {"categories": categories, "answer": answer}
           
        prompt_temp_sistema = PromptTemplate(
            template=prompt,
            input_variables=["context","question"],
            partial_variables=data
        )
        
        chain_type_kwargs = {"prompt": prompt_temp_sistema}
        
        llm = ChatOpenAI(model='gpt-4-0125-preview', temperature=0)
        
        retriever = vectors.as_retriever()   
        
        self.document_chain = RetrievalQA.from_chain_type(
            llm=llm, 
            chain_type="stuff", 
            retriever=retriever,
            return_source_documents=True,
            chain_type_kwargs=chain_type_kwargs)
        
        
        
        response = self.document_chain.invoke({"answer": answer})
        
        return response
    
    def predict(self, entrevista):
        import json
        from langchain.chains import RetrievalQA, RetrievalQAWithSourcesChain
        from langchain_openai import ChatOpenAI 
        from langchain.prompts import PromptTemplate
        
        chunks = generate_chunks()
        index_name = "index"
        vectors = create_vectors(index_name, chunks)  
        prompt = PROMPT_TEMPALTE
        llm = ChatOpenAI(model='gpt-4-0125-preview', temperature=0)
        retriever = vectors.as_retriever()   
        ntrvst = json.loads(entrevista.json())
        
        if 'entrevista' in ntrvst and isinstance(ntrvst['entrevista'], list):
        
            for interview in ntrvst['entrevista']:
              
              question = interview['question']
              categories = interview['categories']
              answer = interview['answer']
                    
              print("Question:", question)
              print("Categories:", ", ".join(categories))
              print("Answer:", answer)
              print("---")
              
              data = {"categories": categories, "answer": answer}
           
              prompt_temp_sistema = PromptTemplate(
                template= prompt,
                input_variables=["context","question"],
                partial_variables=data
              )
              
              chain_type_kwargs = {"prompt": prompt_temp_sistema}
              
              self.document_chain = RetrievalQA.from_chain_type(
                  llm=llm, 
                  chain_type="stuff", 
                  retriever=retriever,
                  return_source_documents=True,
                  chain_type_kwargs=chain_type_kwargs)
              
              
      
              #inicio = time.time()
              evaluacion = self.document_chain.invoke({"query": question})
              #final = time.time()
              
              #duracion = final - inicio              
              #media = np.mean(evaluacion)
              #print(f"Duración: {duracion}")
              #media = np.mean(evaluacion)
              #mediana = np.median(evaluacion)
              #minimo = np.min(evaluacion)
              #maximo = np.max(evaluacion)

              # Imprimir los resultados
              #print(f"Media: {media}")
              #print(f"Mediana: {mediana}")
              #print(f"Mínimo: {minimo}")
              #print(f"Máximo: {maximo}")
          
        else:
            print("La estructura del JSON no es la esperada.")  
      
        print(f'evaluacion.result')
        return evaluacion['result']


