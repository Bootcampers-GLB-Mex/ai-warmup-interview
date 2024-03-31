import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { WarmupsModule } from './warmups/warmups.module';

@Module({
  imports: [WarmupsModule, LoggerModule.forRoot()],
})
export class AppModule {}
