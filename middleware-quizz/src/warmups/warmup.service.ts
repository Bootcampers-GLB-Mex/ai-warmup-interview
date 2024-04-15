import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';
import { UserDto, WarmupDto } from 'src/firestore/data.dto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DocumentData } from 'firebase-admin/firestore';

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
    this.logger.info(
      `User ${userId} has ${userInterviews.length} warmups`
    );
    return userInterviews;
  }

  async getCompletedWarmups(userId: string): Promise<WarmupDto[]> {
    const completedInterviews = await this.firestoreService.getCompletedWarmups(userId);
    this.logger.info(
      `User ${userId} has completed ${completedInterviews.length} warmups`
    );
    return completedInterviews;
  }

  getWarmupByAccessCode(userId: string, accessCode: string): Promise<WarmupDto> {
    return this.firestoreService.getWarmupInfoByAccessCode(userId, accessCode);
  }

  getWarmupById(userId: string, interviewId: string): Promise<WarmupDto> {
    return this.firestoreService.getWarmupInfoById(userId, interviewId);
  }
}
