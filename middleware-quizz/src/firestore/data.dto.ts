import { ApiProperty } from '@nestjs/swagger';

export class Path {
  segments: string[];
}
export class Interview {
  path: Path
}

export class QuestionDto {
  categories: string[];
  context: string;
  question: string;
  id: string;

  static fromFirestore(data: any): QuestionDto {
    return {
      categories: data.categories,
      context: data.context,
      question: data.question,
      id: data.question_id,
    };
  }
}

export class WarmupDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  accessCode: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  level: string;

  @ApiProperty()
  questions: QuestionDto[];

  static fromFirestore(data: any): WarmupDto {
    return data && 
    {
      id: data.interview_id,
      title: data.title,
      accessCode: data.access_code,
      status: data.status,
      role: data.role,
      level: data.level,
      questions: data.questions?.map((question) =>
        QuestionDto.fromFirestore(question)
      )
    };
  }
}

export class UserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  interviews: WarmupDto[];

  static fromFirestore(data: any, userId: string): UserDto {
    return {
      email: data.email,
      id: userId,
      firstName: data.first_name,
      lastName: data.last_name,
      interviews: data.interviews?.map((interview) =>
        WarmupDto.fromFirestore(interview)
      )
    };
  }
}
