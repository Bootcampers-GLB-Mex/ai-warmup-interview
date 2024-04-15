from pathlib import Path
from .container import Container
from .talent_model_processor import TalentModelProcessor
from .utils import write_json
from .interview_dto import InterviewDto

def build_interview():
  container = Container()
  logger = container.logger()
  interview_model = container.interview_model()

  logger.info('Starting creation of interview...')

  talent_model_processor = TalentModelProcessor()

  seniority_level = "Senior"

  talent_model_processor.process(seniority_level=seniority_level)

  full_interview_questions = []

  def generate_questions(skill_level: str, skills_prompt: str):
    interview_questions_raw = interview_model.predict(skills_prompt)
    interview: InterviewDto = InterviewDto.from_questions('Talent Model Senior',interview_questions_raw)
    interview.enrich_questions(dev_level=seniority_level, skill_level=skill_level)
    full_interview_questions.append(interview.to_dict())
  
  talent_model_processor.process_cannot_perform_skills(generate_questions)
  talent_model_processor.process_can_perform_with_supervision_skills(generate_questions)
  talent_model_processor.process_can_perform_w_limited_supervision_skills(generate_questions)
  talent_model_processor.process_can_perform_non_supervision_skills(generate_questions)
  talent_model_processor.process_can_teach_skills(generate_questions)

  write_path = (Path(__file__).parent / f'./fit_interview_talent_model_{seniority_level}.json').resolve()

  write_json(write_path, full_interview_questions)
  
  logger.info('Interview created successfully!')

if __name__ == '__main__':
    build_interview()
