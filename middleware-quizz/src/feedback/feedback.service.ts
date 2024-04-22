import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { WarmupService } from 'src/warmups/warmup.service';
import { CreateFeedbackDto } from './feedback.dto';
import { FirestoreService } from 'src/firestore/firestore.service';

@Injectable()
export class FeedbackService {
  constructor(
    private firestoreService: FirestoreService,
    @InjectPinoLogger(WarmupService.name) private readonly logger: PinoLogger,
  ) {}

  async createFeedback(createFeedbackDto: CreateFeedbackDto) {
    this.logger.info(
      `'Creating feedback': ${createFeedbackDto.userId} - ${createFeedbackDto.interviewId} - ${createFeedbackDto.feedback}`,
    );

    try {
      const userInfo = await this.firestoreService.getUserInfo(
        createFeedbackDto.userId,
      );

      const interviewFeedback = userInfo.interviews.map((interview) => {
        if (interview.id === createFeedbackDto.interviewId) {
          interview.questions = interview.questions.map((question) => {
            const feedback = createFeedbackDto.feedback.find(
              (feedback) => feedback.questionId === question.id,
            );
            question.feedback = feedback.feedback;
            question.score = `${feedback.score}`;
            return question;
          });
        }
        return interview;
      });

      await this.firestoreService.saveFeedback(
        createFeedbackDto.userId,
        interviewFeedback,
      );

      this.logger.info('Feedback created');
    } catch (error) {
      this.logger.error('Error creating feedback', error);
      this.logger.info(`'Feedback not created': ${createFeedbackDto.userId}`);
    }
  }
}
