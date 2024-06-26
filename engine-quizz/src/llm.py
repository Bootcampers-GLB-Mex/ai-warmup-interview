from langchain_openai import ChatOpenAI

from src.configs.settings import AppSettings

class LLMClient:
    def __init__(self, app_settings: AppSettings):
      self.api_key = app_settings.OPEN_API_KEY
      self.model_name = app_settings.OPEN_MODEL_NAME
      self.llm = ChatOpenAI(
        openai_api_key=self.api_key,
        model_name=self.model_name,
        streaming=True,
        temperature=0)
