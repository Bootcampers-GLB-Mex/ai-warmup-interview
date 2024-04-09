from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, HTTPException
from src.container import Container
from .schema import FeedbackRequest
from .service import InterviewerService


interviewer_router = APIRouter(prefix='/interviewer', tags=['AI Interviewer'])

@interviewer_router.post('/feedback')
@inject
def feedback(request: FeedbackRequest, service: InterviewerService=Depends(Provide[Container.interviewer_service])):
  return service.get_feedback(request)

