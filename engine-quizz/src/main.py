import uvicorn

from src.ai_interviewer.router import interviewer_router
from src.ai_interviewer.container import Container

from fastapi import FastAPI, APIRouter

def create_app() -> FastAPI:
  container = Container()

  logger = container.logger()

  logger.info('Starting application...')

  app = FastAPI(
    title="Engine Quizz")
  app.container = container
  
  api_router = APIRouter(prefix='/api/v1')

  api_router.include_router(interviewer_router)

  app.include_router(api_router)

  return app

app = create_app()

if __name__ == '__main__':
  uvicorn.run(create_app())