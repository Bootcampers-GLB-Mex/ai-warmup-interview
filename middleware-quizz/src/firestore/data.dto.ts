import { ApiProperty } from '@nestjs/swagger';

export class Path {
  segments: string[];
}
export class Interview {
  path: Path;
}

export class QuestionDto {
  context: string;
  question: string;
  id: string;
  answer?: string;
  feedback?: string;
  score?: string;

  static fromFirestore(data: any): QuestionDto {
    return {
      context: data.context,
      question: data.question,
      id: data.question_id,
      answer: data.answer,
      feedback: data.feedback,
      score: data.score,
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
    return (
      data && {
        id: data.interview_id,
        title: data.title,
        accessCode: data.access_code,
        status: data.status,
        role: data.role,
        level: data.level,
        questions: data.questions?.map((question) =>
          QuestionDto.fromFirestore(question),
        ),
      }
    );
  }

  static toFirestore(data: WarmupDto): any {
    return {
      interview_id: data.id,
      title: data.title,
      access_code: data.accessCode,
      status: data.status,
      role: data.role,
      level: data.level,
      questions: data.questions?.map((question) => ({
        question_id: question.id,
        question: question.question,
        context: question.context,
        categories: question.categories,
      })),
    };
  }

  static fromSavedData(data: any): WarmupDto {
    return {
      id: data.interview_id,
      title: data.title,
      accessCode: data.access_code,
      status: data.status,
      role: data.role,
      level: data.level,
      questions: data.questions?.map((question) =>
        QuestionDto.fromFirestore(question),
      ),
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
        WarmupDto.fromFirestore(interview),
      ),
    };
  }
}

export class TemplateQuestionDto {
  question: string;
  devLevel: string;
  skillLevel: string;
  skillName: string;
  answer: string;

  static fromFirestore(data: any): TemplateQuestionDto {
    return {
      question: data.question,
      devLevel: data.dev_level,
      skillLevel: data.skill_level,
      skillName: data.skill_name,
      answer: data.answer,
    };
  }

  static toFirestore(data: TemplateQuestionDto): any {
    return {
      question: data.question,
      dev_level: data.devLevel,
      skill_level: data.skillLevel,
      skill_name: data.skillName,
      answer: data.answer,
    };
  }
}

export class InterviewDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  questions: TemplateQuestionDto[];

  static fromFirestore(data: any, interviewId: string): InterviewDto {
    return {
      id: interviewId,
      title: data.interview_title,
      questions: data.questions?.map((interview) =>
        TemplateQuestionDto.fromFirestore(interview),
      ),
    };
  }

  static toFirestore(data: InterviewDto): any {
    return {
      interview_id: data.id,
      interview_title: data.title,
      status: 'New',
      level: 'Junior',
      role: 'Developer',
      questions: data.questions?.map((question) =>
        TemplateQuestionDto.toFirestore(question),
      ),
    };
  }

  static fromSavedData(data: any): InterviewDto {
    return {
      id: data.interview_id,
      title: data.interview_title,
      questions: data.questions?.map((question) =>
        TemplateQuestionDto.fromFirestore(question),
      ),
    };
  }
}
