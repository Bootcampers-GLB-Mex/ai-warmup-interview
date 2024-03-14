from dependency_injector import containers, providers

from src.configs import AppSettings
from src.ai_interviewer.llm import LLMClient
from src.ai_interviewer.model import InterviewerModel
from src.ai_interviewer.service import InterviewerService

class Container(containers.DeclarativeContainer):
  wiring_config = containers.WiringConfiguration(modules=[
    'src.ai_interviewer.router',
  ])

  app_settings = providers.Singleton(AppSettings,)

  config = providers.Configuration()
  config.from_pydantic(app_settings())

  llm_client = providers.Singleton(LLMClient, app_settings)

  interviewer_model = providers.Singleton(InterviewerModel, llm_client)

  interviewer_service = providers.Singleton(InterviewerService, interviewer_model)

