import { ApiProperty } from '@nestjs/swagger';

class Feedback {
  @ApiProperty()
  questionId: string;
  @ApiProperty()
  score: number;
  @ApiProperty()
  feedback: string;
}

export class CreateFeedbackDto {
  @ApiProperty()
  readonly interviewId: string;
  @ApiProperty()
  readonly userId: string;
  @ApiProperty()
  readonly feedback: Feedback[];
}
