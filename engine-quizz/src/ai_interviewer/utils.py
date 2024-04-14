import json

def write_json(file_name: str, skills_prompts: list):
  with open(f'{file_name}.json', 'w') as f:
    json.dump(skills_prompts, f)

def split_to_pages(df, page_size):
  """
  Split a DataFrame into pages of a given size
  """
  return [df[i:i+page_size] for i in range(0, df.shape[0], page_size)]

def generate_skills_prompt(skill_title: str, skills_set: list):
  """
  Generate a prompt for a set of skills
  """
  prompt_skills = f"{skill_title}\n"
  for skill in skills_set:
    prompt_skills += f"- {skill}\n"
  return prompt_skills
