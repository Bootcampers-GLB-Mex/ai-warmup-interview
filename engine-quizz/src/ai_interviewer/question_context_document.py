from langchain_core.documents import Document

class QuestionContextDocument(Document):
  def __init__(self, question: str, context: str):
    super().__init__(page_content=context, metadata={"question": question})

  @staticmethod
  def build_document(question: str, context: str):
    return QuestionContextDocument(question=question, context=context)
    