from langchain_core.documents import Document

class QuestionContextDocument(Document):
  def __init__(self, question: str, context: str, categories: list):
    super().__init__(page_content=context, metadata={"question": question, "categories": categories})

  @staticmethod
  def build_document(question: str, context: str, categories: list):
    return QuestionContextDocument(question=question, context=context, categories=categories)
    