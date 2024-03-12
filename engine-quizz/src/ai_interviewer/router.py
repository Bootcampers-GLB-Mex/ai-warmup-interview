from fastapi import APIRouter, Depends, HTTPException

interviewer_router = APIRouter(prefix='/interviewer', tags=['AI Interviewer'])

@interviewer_router.post('/feedback')
def feedback():
  return {'feedback': 'ok'} # Call Router Service
