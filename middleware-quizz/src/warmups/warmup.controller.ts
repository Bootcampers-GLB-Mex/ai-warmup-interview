import { Body, Controller, Get, Post } from '@nestjs/common';
import { WarmupsResponse } from './responses.schema';
import { WarmupService } from './warmup.service';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { WarmupDto } from 'src/firestore/data.dto';
import { Query } from '@nestjs/common';
import { QuestionWarmupRequestDTO } from './requests.dto';

@Controller('/interviews')
export class WarmupController {
  constructor(private readonly warmupService: WarmupService) {}

  @Get('/user-info')
  @ApiQuery({ name: 'userId', required: true })
  async getUserInfo(@Query('userId') userId: string) {
    const user = await this.warmupService.getUserInfo(userId);
    return user;
  }

  @Get('/all')
  @ApiQuery({ name: 'userId', required: true })
  async getAllWarmups(@Query('userId') userId: string) {
    const warmups = await this.warmupService.getUserWarmups(userId);
    return warmups;
  }

  @Get('/completed')
  @ApiQuery({ name: 'userId', required: true })
  async getCompletedWarmups(@Query('userId') userId: string) {
    return this.warmupService.getCompletedWarmups(userId);
  }

  @Get('/access-code')
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'accessCode', required: true })
  @ApiResponse({ status: 200, type: WarmupDto })
  async getWarmupByAccessCode(
    @Query('userId') userId: string,
    @Query('accessCode') accessCode: string,
  ) {
    return this.warmupService.getWarmupByAccessCode(userId, accessCode);
  }

  @Get('/interview-id')
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'interviewId', required: true })
  @ApiResponse({ status: 200, type: WarmupDto })
  async getWarmup(
    @Query('userId') userId: string,
    @Query('interviewId') interviewId: string,
  ) {
    return this.warmupService.getWarmupById(userId, interviewId);
  }

  @Get('/template/interview-id')
  @ApiQuery({ name: 'interviewId', required: true })
  @ApiResponse({ status: 200, type: WarmupDto })
  async getInterviewTemplateById(@Query('interviewId') interviewId: string) {
    return this.warmupService.getInterviewTemplateById(interviewId);
  }

  @Get('/template/skill-level')
  @ApiQuery({ name: 'interviewId', required: true })
  @ApiQuery({ name: 'skillLevel', required: true })
  async getInterviewTemplateQuestionsBySkillLevel(
    @Query('interviewId') interviewId: string,
    @Query('skillLevel') skillLevel: string,
  ) {
    return this.warmupService.getInterviewTemplateQuestionsBySkillLevel(
      interviewId,
      skillLevel,
    );
  }

  @Get('/template/position')
  @ApiQuery({ name: 'interviewId', required: true })
  @ApiQuery({ name: 'devLevel', required: true })
  async getInterviewTemplateQuestionsByDevLevel(
    @Query('interviewId') interviewId: string,
    @Query('devLevel') devLevel: string,
  ) {
    return this.warmupService.getInterviewTemplateQuestionsByDevLevel(
      interviewId,
      devLevel,
    );
  }

  @Get('/template/skill-name')
  @ApiQuery({ name: 'interviewId', required: true })
  @ApiQuery({ name: 'skillName', required: true })
  async getInterviewTemplateQuestionsBySkillName(
    @Query('interviewId') interviewId: string,
    @Query('skillName') skillName: string,
  ) {
    return this.warmupService.getInterviewTemplateQuestionsBySkillName(
      interviewId,
      skillName,
    );
  }

  @Post('/answers')
  postWarmupAnswers(
    @Body('questions') questions: QuestionWarmupRequestDTO[],
    @Body('interviewId') interviewId: string,
    @Body('userId') userId: string,
  ) {
    this.warmupService.saveUserWarmup(userId, interviewId, questions);
  }

  @Post('/:id/feedback/status')
  postWarmupFeedbackStatus(): WarmupsResponse {
    throw new Error('Not implemented');
  }

  @Post('/:id/feedback')
  postWarmupFeedback(): WarmupsResponse {
    throw new Error('Not implemented');
  }
}
