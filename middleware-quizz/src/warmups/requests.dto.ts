import { ApiProperty } from '@nestjs/swagger';
import {
  FilterByCriteria,
  OrderByCriteria,
  WarmupsRequest,
} from './requests.schema';

export class WarmupsRequestDTO implements WarmupsRequest {
  @ApiProperty()
  filterBy: FilterByCriteria;

  @ApiProperty()
  orderBy: OrderByCriteria;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}

export class QuestionWarmupRequestDTO {
  @ApiProperty()
  question: string;
  @ApiProperty()
  devLevel: string;
  @ApiProperty()
  skillLevel: string;
  @ApiProperty()
  skillName: string;
  @ApiProperty()
  compareAnswer: string;
  @ApiProperty()
  answer: string;
}

interface QuestionsFirestore {
  question: string;
  questionId: string;
  devLevel: string;
  skillLevel: string;
  skillName: string;
  compareAnswer: string;
  answer: string;
}

export class WarmupFirestore {
  questions: QuestionsFirestore[];
  interviewId: string;
  userId: string;

  static fromRequest(
    interviewId: string,
    userId: string,
    questions: QuestionWarmupRequestDTO[],
  ): WarmupFirestore {
    return {
      interviewId,
      userId,
      questions: questions.map((question, index) => ({
        question: question.question,
        questionId: `Q${index + 1}`,
        devLevel: question.devLevel,
        skillLevel: question.skillLevel,
        skillName: question.skillName,
        compareAnswer: question.compareAnswer,
        answer: question.answer,
      })),
    };
  }
}

export class FeedbackQuestionsRequest {
  question: string;
  question_id: string;
  answer: string;
  compare_answer: string;

  static fromQuestionsFirestore(
    questions: QuestionsFirestore[],
  ): FeedbackQuestionsRequest[] {
    return questions.map((question) => ({
      question: question.question,
      question_id: question.questionId,
      answer: question.answer,
      compare_answer: question.compareAnswer,
    }));
  }
}
