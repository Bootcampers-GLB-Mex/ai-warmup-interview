import { Injectable } from '@nestjs/common';
import { initializeApp, cert } from 'firebase-admin/app';
import { ConfigService } from '@nestjs/config';
import { getFirestore, Firestore, FieldValue } from 'firebase-admin/firestore';
import {
  InterviewDto,
  TemplateQuestionsDto,
  UserDto,
  UserInterviewDto,
  UserInterviewsDto,
} from './data.dto';
import {
  UserFirestore,
  UserInterviewFirestore,
  InterviewFirestore,
} from './firestore.schemas';

@Injectable()
export class FirestoreService {
  db: Firestore;

  constructor(private appConfigService: ConfigService) {
    initializeApp({
      credential: cert(appConfigService.get('googleApplicationCredentials')),
    });
    this.db = getFirestore();
    this.db.settings({ ignoreUndefinedProperties: true });
  }

  async getUserInfo(userId: string): Promise<UserDto> {
    const userRef = this.db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return null;
    }

    return UserDto.fromFirestore(userDoc.data() as UserFirestore, userId);
  }

  async getUserInterviews(userId: string): Promise<UserInterviewsDto> {
    const userRef = this.db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return null;
    }
    const interviews: UserInterviewFirestore[] = userDoc.get('interviews');

    return UserInterviewsDto.fromFirestore(interviews);
  }

  async getCompletedWarmups(userId: string): Promise<UserInterviewsDto> {
    const snapshot = await this.db.collection('users').doc(userId).get();
    const interviews = snapshot.data().interviews;
    const interviewsDone = interviews.filter(
      (interview) => interview.status === 'Done',
    );
    return UserInterviewsDto.fromFirestore(interviewsDone);
  }

  async getUserInterviewById(
    userId: string,
    interviewId: string,
  ): Promise<UserInterviewDto> {
    const snapshot = await this.db.collection('users').doc(userId).get();
    const interviews: UserInterviewFirestore[] = snapshot.data().interviews;
    const interviewsFound = interviews.filter(
      (interview) => interview.interview_id === interviewId,
    );
    return interviewsFound.length > 0
      ? UserInterviewDto.fromFirestore(interviewsFound[0])
      : null;
  }

  async getInterviewTemplateById(interviewId: string): Promise<InterviewDto> {
    const interviewRef = this.db.collection('interviews').doc(interviewId);
    const interviewDoc = await interviewRef.get();
    if (!interviewDoc.exists) {
      return null;
    }

    return InterviewDto.fromFirestore(
      interviewDoc.data() as InterviewFirestore,
      interviewId,
    );
  }

  async getInterviewTemplateQuestionsBySkillLevel(
    interviewId: string,
    skillLevel: string,
  ): Promise<TemplateQuestionsDto> {
    const snapshot = await this.db
      .collection('interviews')
      .doc(interviewId)
      .get();
    const questions = snapshot.data().questions;
    const questionsFiltered = questions.filter(
      (question) => question.skill_level === skillLevel,
    );
    return TemplateQuestionsDto.fromFirestore(questionsFiltered);
  }

  async getInterviewTemplateQuestionsByDevLevel(
    interviewId: string,
    devLevel: string,
  ): Promise<TemplateQuestionsDto> {
    const snapshot = await this.db
      .collection('interviews')
      .doc(interviewId)
      .get();
    const questions = snapshot
      .data()
      .questions.filter((question) => question.dev_level === devLevel);
    return TemplateQuestionsDto.fromFirestore(questions);
  }

  async getInterviewTemplateQuestionsBySkillName(
    interviewId: string,
    skillName: string,
  ): Promise<TemplateQuestionsDto> {
    const snapshot = await this.db
      .collection('interviews')
      .doc(interviewId)
      .get();
    const questions = snapshot
      .data()
      .questions.filter((question) => question.skill_name === skillName);
    return TemplateQuestionsDto.fromFirestore(questions);
  }

  async updateUserInterviews(
    userId: string,
    interview: UserInterviewFirestore,
  ) {
    return await this.db
      .collection('users')
      .doc(userId)
      .update({
        interviews: FieldValue.arrayUnion(interview),
      });
  }

  async saveFeedback(userId: string, interviews: any) {
    return await this.db.collection('users').doc(userId).update({
      interviews,
    });
  }

  async setUserInterview(userId: string, interviews: UserInterviewFirestore[]) {
    return await this.db.collection('users').doc(userId).set({
      interviews,
    });
  }
}
