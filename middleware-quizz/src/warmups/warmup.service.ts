import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';
import {
  InterviewDto,
  TemplateQuestionDto,
  UserDto,
  WarmupDto,
} from 'src/firestore/data.dto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FeedbackQuestionsRequest, QuestionWarmupRequestDTO, WarmupFirestore } from './requests.dto';

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

  async getUserWarmups(userId: string): Promise<WarmupDto[]> {
    const userInterviews = await this.firestoreService.getUserWarmups(userId);
    this.logger.info(`User ${userId} has ${userInterviews.length} warmups`);
    return userInterviews;
  }

  async getCompletedWarmups(userId: string): Promise<WarmupDto[]> {
    const completedInterviews =
      await this.firestoreService.getCompletedWarmups(userId);
    this.logger.info(
      `User ${userId} has completed ${completedInterviews.length} warmups`,
    );
    return completedInterviews;
  }

  getWarmupByAccessCode(
    userId: string,
    accessCode: string,
  ): Promise<WarmupDto> {
    return this.firestoreService.getWarmupInfoByAccessCode(userId, accessCode);
  }

  getWarmupById(userId: string, interviewId: string): Promise<WarmupDto> {
    return this.firestoreService.getWarmupInfoById(userId, interviewId);
  }

  getInterviewTemplateById(interviewId: string): Promise<InterviewDto> {
    return this.firestoreService.getInterviewTemplateById(interviewId);
  }

  getInterviewTemplateQuestionsBySkillLevel(
    interviewId: string,
    skillLevel: string,
  ): Promise<TemplateQuestionDto[]> {
    return this.firestoreService.getInterviewTemplateQuestionsBySkillLevel(
      interviewId,
      skillLevel,
    );
  }

  getInterviewTemplateQuestionsByDevLevel(
    interviewId: string,
    devLevel: string,
  ): Promise<TemplateQuestionDto[]> {
    return this.firestoreService.getInterviewTemplateQuestionsByDevLevel(
      interviewId,
      devLevel,
    );
  }

  getInterviewTemplateQuestionsBySkillName(
    interviewId: string,
    skillName: string,
  ): Promise<TemplateQuestionDto[]> {
    return this.firestoreService.getInterviewTemplateQuestionsBySkillName(
      interviewId,
      skillName,
    );
  }

  async saveUserWarmup(
    userId: string,
    interviewId: string,
    warmup: QuestionWarmupRequestDTO[],
  ): Promise<void> {
    try {
      const interview = WarmupFirestore.fromRequest(
        interviewId,
        userId,
        warmup,
      );
      await this.firestoreService.saveWarmup(userId, interviewId, interview);
      this.logger.info(`User ${userId} saved warmup ${interviewId}`);

      const resp = await fetch(
        'http://localhost:8000/api/v1/interviewer/feedback',
        {
          method: 'POST',
          body: JSON.stringify({
            questions: FeedbackQuestionsRequest.fromQuestionsFirestore(
              interview.questions,
            ),
            interview_id: interviewId,
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
