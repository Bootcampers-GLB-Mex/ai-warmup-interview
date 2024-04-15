import pandas as pd
from pathlib import Path
from .utils import generate_skills_prompt, split_to_pages

talent_model_map = {
  "Senior": {
    "column_name": "Level 4",
    "index": 7
  },
  "SSR": {
    "column_name": "Level 3",
    "index": 6
  }
}

class TalentModelProcessor:
  def __init__(self):
    path = (Path(__file__).parent / './Talent-Model.csv').resolve()
    self.talent_model = pd.read_csv(path)

  def process(self, seniority_level):
    seniority_map = talent_model_map[seniority_level]
    senior_column_name = seniority_map['column_name']

    self.talent_model.fillna(method='ffill', inplace=True)
    skills_n_seniority = self.talent_model.iloc[:, [2,3,seniority_map['index']]]

    skills_n_seniority = skills_n_seniority.assign(
      Skill_name= lambda x: x['Subjects']+ " " + x['Tool / Framework / Libs'])

    cannot_perform = skills_n_seniority.query(
      f'`{senior_column_name}` == "1 - Cannot perform"')
    can_perform_with_supervision = skills_n_seniority.query(
      f'`{senior_column_name}` == "2 - Can perform with supervision"')
    can_perform_w_limited_supervision = skills_n_seniority.query(
      f'`{senior_column_name}` == "3 - Can perform with limited supervision"')
    can_perform_non_supervision = skills_n_seniority.query(
      f'`{senior_column_name}` == "4 - Can perform without supervision"')
    can_teach = skills_n_seniority.query(
      f'`{senior_column_name}` == "5 - Can teach others"')

    cannot_perform = cannot_perform.iloc[:, -1]
    can_perform_with_supervision = can_perform_with_supervision.iloc[:, -1]
    can_perform_w_limited_supervision = can_perform_w_limited_supervision.iloc[:, -1]
    can_perform_non_supervision = can_perform_non_supervision.iloc[:, -1]
    can_teach = can_teach.iloc[:, -1]

    self.cannot_perform = [
      generate_skills_prompt("Cannot perform:", page)
      for page in split_to_pages(cannot_perform, 10)]
    self.can_perform_with_supervision = [
      generate_skills_prompt("Can perform with supervision:", page)
      for page in split_to_pages(can_perform_with_supervision, 10)]
    self.can_perform_w_limited_supervision = [
      generate_skills_prompt("Can perform with limited supervision:", page)
      for page in split_to_pages(can_perform_w_limited_supervision, 10)]
    self.can_perform_non_supervision = [
      generate_skills_prompt("Can perform without supervision:", page)
      for page in split_to_pages(can_perform_non_supervision, 10)]
    self.can_teach = [generate_skills_prompt("Can teach others:", page)
                      for page in split_to_pages(can_teach, 10)]
    
  def process_cannot_perform_skills(self, predicate):
    [predicate('Cannot perform', skills_prompt) for skills_prompt in self.cannot_perform]
  
  def process_can_perform_with_supervision_skills(self, predicate):
    [predicate('Can perform with supervision', skills_prompt)
     for skills_prompt in self.can_perform_with_supervision]

  def process_can_perform_w_limited_supervision_skills(self, predicate):
    [predicate('Can perform with limited supervision', skills_prompt)
     for skills_prompt in self.can_perform_w_limited_supervision]

  def process_can_perform_non_supervision_skills(self, predicate):
    [predicate('Can perform without supervision',skills_prompt) for skills_prompt in self.can_perform_non_supervision]
  
  def process_can_teach_skills(self, predicate):
    [predicate('Can teach others', skills_prompt) for skills_prompt in self.can_teach]
