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
      await this.firestoreService.saveFeedback(createFeedbackDto.userId, {
        interviewId: createFeedbackDto.interviewId,
        feedback: createFeedbackDto.feedback,
      });

      this.logger.info('Feedback created');
    } catch (error) {
      this.logger.error('Error creating feedback', error);
      this.logger.info(`'Feedback not created': ${createFeedbackDto.userId}`);
    }
  }
}
