from pydantic import BaseSettings

class Settings(BaseSettings):
  API_DEBUG: bool = False
  API_V1_STR: str = '/api/v1'
  ENV: str
