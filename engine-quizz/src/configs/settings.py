from pathlib import Path

from pydantic import BaseSettings

secrets_dir_path = Path(__file__).parent.parent.resolve()
secrets_file_path = f'{secrets_dir_path}/.env'

class AppSettings(BaseSettings):
  API_DEBUG: bool = False
  API_V1_STR: str = '/api/v1'
  ENV: str = 'development'

  OPEN_API_KEY: str
  OPEN_MODEL_NAME: str = "gpt-3.5-turbo"

  class Config:
    env_file = [secrets_file_path]
