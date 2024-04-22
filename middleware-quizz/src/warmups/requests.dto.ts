import { ApiProperty } from '@nestjs/swagger';
import {
  FilterByCriteria,
  OrderByCriteria,
  WarmupsRequest,
} from './requests.schema';
import { UserInterviewQuestionDto } from 'src/firestore/data.dto';

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

export class QuestionWarmupRequestDto {
  @ApiProperty()
  questionId: string;
  @ApiProperty()
  question: string;
  @ApiProperty()
  answer: string;
}

export class FeedbackQuestionsRequest {
  question: string;
  question_id: string;
  answer: string;
  compare_answer: string;

  static fromUserInterviewQuestions(
    questions: UserInterviewQuestionDto[],
  ): FeedbackQuestionsRequest[] {
    return questions.map((question) => ({
      question: question.question,
      question_id: question.id,
      answer: question.answer,
      compare_answer: question.context,
    }));
  }
}
