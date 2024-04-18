from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, BackgroundTasks
from src.ai_interviewer.container import Container
from .schema import FeedbackRequest
from .service import InterviewerService


interviewer_router = APIRouter(prefix='/interviewer', tags=['AI Interviewer'])

@interviewer_router.post('/feedback')
@inject
def feedback(
  request: FeedbackRequest,
  background_tasks: BackgroundTasks,
  service: InterviewerService=Depends(Provide[Container.interviewer_service]),
):
  background_tasks.add_task(service.get_feedback, request)
  return {'message': 'Feedback is being processed. Thank you!'}
