class InterviewQuestionDto:
  def __init__(self, question: str, answer: str, skill: str):
    self.question = question
    self.answer = answer
    self.skill_name = skill

  @staticmethod
  def from_dict(data: list):
    return InterviewQuestionDto(data["question"], data["answer"], data["skill"])
  
  def set_dev_level(self, dev_level: str):
    self.dev_level = dev_level

  def set_skill_level(self, skill_level: str):
    self.skill_level = skill_level

class InterviewDto:
  def __init__(self, interview_title: str, questions: list):
    self.interview_title = interview_title
    self.questions = questions

  @staticmethod
  def from_questions(interview_title: str, data: list):
    questions = [InterviewQuestionDto.from_dict(q) for q in data]
    return InterviewDto(interview_title, questions)
  
  def enrich_questions(self, dev_level: str, skill_level: str):
    for q in self.questions:
      q.set_dev_level(dev_level)
      q.set_skill_level(skill_level)

  def add_questions(self, questions: list):
    self.questions.extend(questions)

  def to_dict(self):
    return {
      "interview_title": self.interview_title,
      "questions": [q.__dict__ for q in self.questions]
    }

  def __str__(self):
    return f"Skill: {self.skill_name} - Questions: {len(self.questions)}"

  def __repr__(self):
    return f"Skill: {self.skill_name} - Questions: {len(self.questions)}"