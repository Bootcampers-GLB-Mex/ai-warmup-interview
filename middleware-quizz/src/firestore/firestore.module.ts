import { Module } from '@nestjs/common';
import { FirestoreService } from './firestore.service';
import { AppConfigModule } from 'src/configuration/config.module';

@Module({
  imports: [AppConfigModule],
  providers: [FirestoreService],
  exports: [FirestoreService],
})
export class FirestoreModule {}
