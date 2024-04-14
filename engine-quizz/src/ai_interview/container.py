from dependency_injector import containers, providers

from src.configs.settings import AppSettings
from src.llm import LLMClient
from src.ai_interview.interview_model import InterviewModel
from src.logger import AppLogger

class Container(containers.DeclarativeContainer):
  wiring_config = containers.WiringConfiguration(modules=[
    'src.ai_interviewer.router',
  ])

  app_settings = providers.Singleton(AppSettings,)

  config = providers.Configuration()
  config.from_pydantic(app_settings())

  logger = providers.Singleton(AppLogger,)

  llm_client = providers.Singleton(LLMClient, app_settings)

  interviewer_model = providers.Singleton(InterviewModel, llm_client, logger)

