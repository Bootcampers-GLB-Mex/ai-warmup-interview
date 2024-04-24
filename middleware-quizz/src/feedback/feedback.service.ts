import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { WarmupService } from 'src/warmups/warmup.service';
import { CreateFeedbackDto } from './feedback.dto';
import { FirestoreService } from 'src/firestore/firestore.service';
import {
  UserInterviewQuestionsDto,
  UserInterviewsDto,
} from 'src/firestore/data.dto';

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
      const interview = await this.firestoreService.getUserInterviewById(
        createFeedbackDto.userId,
        createFeedbackDto.interviewId,
      );

      interview.status = 'COMPLETED';

      interview.questions = UserInterviewQuestionsDto.fromFeedback(
        interview.questions,
        createFeedbackDto.feedback,
      );

      const interviews = await this.firestoreService.getUserInterviews(
        createFeedbackDto.userId,
      );

      await this.firestoreService.setUserInterview(
        createFeedbackDto.userId,
        UserInterviewsDto.toFirestore(
          UserInterviewsDto.fromInterview(interviews, interview),
        ),
      );

      this.logger.info('Feedback created');
    } catch (error) {
      this.logger.error('Error creating feedback', error);
      this.logger.info(`'Feedback not created': ${createFeedbackDto.userId}`);
    }
  }
}
