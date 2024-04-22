import { ApiProperty } from '@nestjs/swagger';
import {
  InterviewFirestore,
  InterviewQuestionFirestore,
  UserFirestore,
  UserInterviewQuestionFirestore,
  UserInterviewFirestore,
} from './firestore.schemas';
import { QuestionWarmupRequestDto } from 'src/warmups/requests.dto';

export class Path {
  segments: string[];
}
export class Interview {
  path: Path;
}

export class UserInterviewQuestionDto {
  id: string;
  question: string;
  context: string;
  answer?: string;
  feedback?: string;
  score?: string;

  static fromFirestore(
    data: UserInterviewQuestionFirestore,
  ): UserInterviewQuestionDto {
    return {
      context: data.context,
      question: data.question,
      id: data.question_id,
      answer: data.answer,
      feedback: data.feedback,
      score: data.score,
    };
  }

  static toFirestore(
    data: UserInterviewQuestionDto,
  ): UserInterviewQuestionFirestore {
    return {
      question_id: data.id,
      question: data.question,
      context: data.context,
      answer: data.answer,
      feedback: data.feedback,
      score: data.score,
    };
  }
}

export class UserInterviewQuestionsDto {
  questions: UserInterviewQuestionDto[];

  static fromFirestore(
    data: UserInterviewQuestionFirestore[],
  ): UserInterviewQuestionsDto {
    return {
      questions: data.map((question) =>
        UserInterviewQuestionDto.fromFirestore(question),
      ),
    };
  }

  static toFirestore(
    data: UserInterviewQuestionsDto,
  ): UserInterviewQuestionFirestore[] {
    return data.questions.map((question) =>
      UserInterviewQuestionDto.toFirestore(question),
    );
  }

  static fromTemplateQuestions(
    questions: TemplateQuestionDto[],
  ): UserInterviewQuestionsDto {
    return {
      questions: questions.map((question, index) => ({
        id: `Q${index + 1}`,
        question: question.question,
        context: question.skillName,
        answer: question.answer,
      })),
    };
  }

  static formAnswers(
    questions: UserInterviewQuestionsDto,
    answers: QuestionWarmupRequestDto[],
  ): UserInterviewQuestionsDto {
    return {
      questions: questions.questions.map((question) => ({
        ...question,
        answer: answers.find((answer) => answer.questionId === question.id)
          .answer,
      })),
    };
  }
}

export class UserInterviewDto {
  id: string;
  title: string;
  status: string;
  role: string;
  level: string;
  questions: UserInterviewQuestionsDto;

  static fromFirestore(data: UserInterviewFirestore): UserInterviewDto {
    return {
      id: data.interview_id,
      title: data.title,
      status: data.status,
      role: data.role,
      level: data.level,
      questions: UserInterviewQuestionsDto.fromFirestore(data.questions),
    };
  }

  static toFirestore(data: UserInterviewDto): any {
    return {
      interview_id: data.id,
      title: data.title,
      status: data.status,
      role: data.role,
      level: data.level,
      questions: UserInterviewQuestionsDto.toFirestore(data.questions),
    };
  }

  static fromSavedData(data: any): UserInterviewDto {
    return {
      id: data.interview_id,
      title: data.title,
      status: data.status,
      role: data.role,
      level: data.level,
      questions: data.questions?.map((question) =>
        UserInterviewQuestionDto.fromFirestore(question),
      ),
    };
  }
}

export class UserInterviewsDto {
  interviews: UserInterviewDto[];

  static fromFirestore(data: UserInterviewFirestore[]): UserInterviewsDto {
    return {
      interviews: data.map((interview) =>
        UserInterviewDto.fromFirestore(interview),
      ),
    };
  }

  static toFirestore(data: UserInterviewsDto): UserInterviewFirestore[] {
    return data.interviews.map((interview) =>
      UserInterviewDto.toFirestore(interview),
    );
  }

  static fromInterview(
    data: UserInterviewsDto,
    interview: UserInterviewDto,
  ): UserInterviewsDto {
    return {
      interviews: data.interviews.map((tInterview) =>
        tInterview.id === interview.id ? interview : tInterview,
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
  interviews: UserInterviewsDto;

  static fromFirestore(data: UserFirestore, userId: string): UserDto {
    return {
      email: data.email,
      id: userId,
      firstName: data.first_name,
      lastName: data.last_name,
      interviews: UserInterviewsDto.fromFirestore(data.interviews),
    };
  }

  static toFirestore(data: UserDto): UserFirestore {
    return {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      interviews: UserInterviewsDto.toFirestore(data.interviews),
    };
  }
}

export class TemplateQuestionDto {
  question: string;
  devLevel: string;
  skillLevel: string;
  skillName: string;
  answer: string;

  static fromFirestore(data: InterviewQuestionFirestore): TemplateQuestionDto {
    return {
      question: data.question,
      devLevel: data.dev_level,
      skillLevel: data.skill_level,
      skillName: data.skill_name,
      answer: data.answer,
    };
  }

  static toFirestore(data: TemplateQuestionDto): InterviewQuestionFirestore {
    return {
      question: data.question,
      dev_level: data.devLevel,
      skill_level: data.skillLevel,
      skill_name: data.skillName,
      answer: data.answer,
    };
  }
}

export class TemplateQuestionsDto {
  questions: TemplateQuestionDto[];

  static fromFirestore(
    data: InterviewQuestionFirestore[],
  ): TemplateQuestionsDto {
    return {
      questions: data.map((question) =>
        TemplateQuestionDto.fromFirestore(question),
      ),
    };
  }

  static toFirestore(data: TemplateQuestionsDto): InterviewQuestionFirestore[] {
    return data.questions.map((question) =>
      TemplateQuestionDto.toFirestore(question),
    );
  }
}

export class InterviewDto {
  id: string;
  title: string;
  questions: TemplateQuestionsDto;

  static fromFirestore(
    data: InterviewFirestore,
    interviewId: string,
  ): InterviewDto {
    return {
      id: interviewId,
      title: data.title,
      questions: TemplateQuestionsDto.fromFirestore(data.questions),
    };
  }

  static toFirestore(data: InterviewDto): InterviewFirestore {
    return {
      title: data.title,
      questions: TemplateQuestionsDto.toFirestore(data.questions),
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
