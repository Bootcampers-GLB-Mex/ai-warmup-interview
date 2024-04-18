from dependency_injector import containers, providers

from src.configs.settings import AppSettings
from src.llm import LLMClient
from src.ai_interviewer.interviewer_model import InterviewerModel
from src.ai_interviewer.service import InterviewerService
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

  interviewer_model = providers.Singleton(InterviewerModel, llm_client, logger)

  interviewer_service = providers.Singleton(InterviewerService, interviewer_model, logger)

