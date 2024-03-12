import uvicorn
from typing import Union

from src.ai_interviewer.router import interviewer_router

from fastapi import FastAPI, APIRouter

def create_app() -> FastAPI:
  app = FastAPI(
    title="Engine Quizz")
  
  api_router = APIRouter(prefix='/api/v1')

  api_router.include_router(interviewer_router)

  app.include_router(api_router)

  return app

app = create_app()

if __name__ == '__main__':
  uvicorn.run(create_app())