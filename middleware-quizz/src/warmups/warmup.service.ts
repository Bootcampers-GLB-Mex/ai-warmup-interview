import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';
import {
  InterviewDto,
  TemplateQuestionsDto,
  UserDto,
  UserInterviewDto,
  UserInterviewQuestionsDto,
  UserInterviewsDto,
} from 'src/firestore/data.dto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  FeedbackQuestionsRequest,
  QuestionWarmupRequestDto,
} from './requests.dto';
import { getRandomElements } from './utils';

@Injectable()
export class WarmupService {
  constructor(
    private firestoreService: FirestoreService,
    @InjectPinoLogger(WarmupService.name) private readonly logger: PinoLogger,
  ) {}

  getWarmup(): string {
    return 'Warmup!';
  }

  async getUserInfo(userId: string): Promise<UserDto> {
    return await this.firestoreService.getUserInfo(userId);
  }

  async getUserWarmups(userId: string): Promise<UserInterviewsDto> {
    try {
      const userInterviews =
        await this.firestoreService.getUserInterviews(userId);
      this.logger.info(
        `User ${userId} has ${userInterviews.interviews.length} warmups`,
      );
      return userInterviews;
    } catch (error) {
      this.logger.error(error);
      return { interviews: [] };
    }
  }

  async getCompletedWarmups(userId: string): Promise<UserInterviewsDto> {
    const completedInterviews =
      await this.firestoreService.getCompletedWarmups(userId);
    this.logger.info(
      `User ${userId} has completed ${completedInterviews.interviews.length} warmups`,
    );
    return completedInterviews;
  }

  getWarmupById(
    userId: string,
    interviewId: string,
  ): Promise<UserInterviewDto> {
    return this.firestoreService.getUserInterviewById(userId, interviewId);
  }

  getInterviewTemplateById(interviewId: string): Promise<InterviewDto> {
    return this.firestoreService.getInterviewTemplateById(interviewId);
  }

  getInterviewTemplateQuestionsBySkillLevel(
    interviewId: string,
    skillLevel: string,
  ): Promise<TemplateQuestionsDto> {
    return this.firestoreService.getInterviewTemplateQuestionsBySkillLevel(
      interviewId,
      skillLevel,
    );
  }

  getInterviewTemplateQuestionsByDevLevel(
    interviewId: string,
    devLevel: string,
  ): Promise<TemplateQuestionsDto> {
    return this.firestoreService.getInterviewTemplateQuestionsByDevLevel(
      interviewId,
      devLevel,
    );
  }

  getInterviewTemplateQuestionsBySkillName(
    interviewId: string,
    skillName: string,
  ): Promise<TemplateQuestionsDto> {
    return this.firestoreService.getInterviewTemplateQuestionsBySkillName(
      interviewId,
      skillName,
    );
  }

  async createRandomUserInterview(userId: string) {
    const interviewTemplate =
      await this.firestoreService.getInterviewTemplateById(
        'KSchtFol3eaEtLilJ3VJ',
      );
    this.logger.info(
      `Template questions: ${interviewTemplate.questions.questions.length}`,
    );
    const randomQuestions = UserInterviewQuestionsDto.fromTemplateQuestions(
      getRandomElements(interviewTemplate.questions.questions),
    );
    const interview = new UserInterviewDto();
    interview.id = 'KSchtFol3eaEtLilJ3VJ';
    interview.title = 'Senior Developer';
    interview.status = 'NEW';
    interview.role = 'Developer';
    interview.level = 'Senior';
    interview.questions = randomQuestions;

    await this.firestoreService.updateUserInterviews(
      userId,
      UserInterviewDto.toFirestore(interview),
    );

    return interview;
  }

  async saveUserWarmup(
    userId: string,
    interviewId: string,
    warmup: QuestionWarmupRequestDto[],
  ): Promise<void> {
    try {
      const interview = await this.firestoreService.getUserInterviewById(
        userId,
        interviewId,
      );

      interview.questions = UserInterviewQuestionsDto.formAnswers(
        interview.questions,
        warmup,
      );
      interview.status = 'PROCESSING';

      const interviews = await this.firestoreService.getUserInterviews(userId);

      await this.firestoreService.setUserInterview(
        userId,
        UserInterviewsDto.toFirestore(
          UserInterviewsDto.fromInterview(interviews, interview),
        ),
      );
      this.logger.info(`User ${userId} saved warmup ${interviewId}`);

      const resp = await fetch(
        'http://127.0.0.1:8000/api/v1/interviewer/feedback',
        {
          method: 'POST',
          body: JSON.stringify({
            questions: FeedbackQuestionsRequest.fromUserInterviewQuestions(
              interview.questions.questions,
            ),
            interview_id: interview.id,
            user_id: userId,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const result = await resp.json();
      this.logger.info(`Feedback response: ${result}`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
