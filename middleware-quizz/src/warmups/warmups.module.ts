import { Module } from '@nestjs/common';
import { WarmupController } from './warmup.controller';

@Module({
  // imports: [],
  controllers: [WarmupController],
  // providers: [],
})
export class WarmupsModule {}
