import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { WarmupsModule } from './warmups/warmups.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [WarmupsModule, FeedbackModule, LoggerModule.forRoot()],
})
export class AppModule {}
