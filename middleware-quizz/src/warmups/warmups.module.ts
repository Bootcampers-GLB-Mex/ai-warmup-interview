import { Module } from '@nestjs/common';
import { WarmupController } from './warmup.controller';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { WarmupService } from './warmup.service';

@Module({
  imports: [FirestoreModule],
  controllers: [WarmupController],
  providers: [WarmupService],
})
export class WarmupsModule {}
