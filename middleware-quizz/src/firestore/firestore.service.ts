import { Injectable } from '@nestjs/common';
import { initializeApp, cert } from 'firebase-admin/app';
import { ConfigService } from '@nestjs/config';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { InterviewDto, TemplateQuestionDto, UserDto, WarmupDto } from './data.dto';

@Injectable()
export class FirestoreService {
  db: Firestore;

  constructor(private appConfigService: ConfigService) {
    initializeApp({
      credential: cert(appConfigService.get('googleApplicationCredentials')),
    });
    this.db = getFirestore();
  }

  async getUserInfo(userId: string): Promise<UserDto> {
    const userRef = this.db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return null;
    }

    return UserDto.fromFirestore(userDoc.data(), userId);
  }

  async getUserWarmups(userId: string): Promise<WarmupDto[]> {
    const userRef = this.db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return null;
    }
    const interviews = userDoc.get("interviews");

    const mapped = [];
    interviews.forEach(function (element: any) {
      mapped.push(WarmupDto.fromFirestore(element));
    });

    return mapped;
  }

  async getCompletedWarmups(userId: string): Promise<WarmupDto[]> {
    return await this.db.collection('users').doc(userId).get().then(snapshot => {
      var result = [];
      snapshot.data().interviews.filter(interview => interview.status === 'Done')
      .forEach((doneInterview: any) => {
        const dto = WarmupDto.fromFirestore(doneInterview);
        result.push(dto);
      });
      return result;
    });
  }

  async getWarmupInfoByAccessCode(userId: string, accessCode: string): Promise<WarmupDto> {
    return await this.db.collection('users').doc(userId).get().then(snapshot => {
      var result = [];
      snapshot.data().interviews.filter(interview => interview.access_code === accessCode)
        .forEach((found: any) => {
          result.push(WarmupDto.fromFirestore(found));
        });
        return result.length == 0 ? null : result[0];
    });
  }

  async getWarmupInfoById(userId: string, interviewId: string): Promise<WarmupDto> {
    return await this.db.collection('users').doc(userId).get().then(snapshot => {
      var result = [];
      snapshot.data().interviews.filter(interview => interview.interview_id === interviewId)
        .forEach((found: any) => {
          result.push(WarmupDto.fromFirestore(found));
        });
        return result.length == 0 ? null : result[0];
    });
  }

  async getInterviewTemplateById(interviewId: string): Promise<InterviewDto> {
    const interviewRef = this.db.collection('interviews').doc(interviewId);
    const interviewDoc = await interviewRef.get();
    if (!interviewDoc.exists) {
      return null;
    }

    return InterviewDto.fromFirestore(interviewDoc.data(), interviewId);
  }

  async getInterviewTemplateQuestionsBySkillLevel(skillLevel: string): Promise<TemplateQuestionDto[]> {
    return await this.db.collection('interviews').get().then(snapshot => {
      var result = [];
      snapshot.forEach(interview => {
        interview.data().questions.filter(question => question.skill_level === skillLevel)
        .forEach((found: any) => {
          result.push(TemplateQuestionDto.fromFirestore(found));
        });
      });
      return result;
    });
  }

  async getInterviewTemplateQuestionsByDevLevel(devLevel: string): Promise<TemplateQuestionDto[]> {
    return await this.db.collection('interviews').get().then(snapshot => {
      var result = [];
      snapshot.forEach(interview => {
        interview.data().questions.filter(question => question.dev_level === devLevel)
        .forEach((found: any) => {
          result.push(TemplateQuestionDto.fromFirestore(found));
        });
      });
      return result;
    });
  }

  async getInterviewTemplateQuestionsBySkillName(skillName: string): Promise<TemplateQuestionDto[]> {
    return await this.db.collection('interviews').get().then(snapshot => {
      var result = [];
      snapshot.forEach(interview => {
        interview.data().questions.filter(question => question.skill_name === skillName)
        .forEach((found: any) => {
          result.push(TemplateQuestionDto.fromFirestore(found));
        });
      });
      return result;
    });
  }
}