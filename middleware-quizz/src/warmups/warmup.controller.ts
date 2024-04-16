import { Controller, Get, Post } from '@nestjs/common';
import { WarmupsResponse } from './responses.schema';
import { WarmupService } from './warmup.service';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { WarmupDto } from 'src/firestore/data.dto';
import { Query } from '@nestjs/common';

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
  async getWarmupByAccessCode(@Query('userId') userId: string, @Query('accessCode') accessCode: string) {
    return this.warmupService.getWarmupByAccessCode(userId, accessCode);
  }

  @Get('/interview-id')
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'interviewId', required: true })
  @ApiResponse({ status: 200, type: WarmupDto })
  async getWarmup(@Query('userId') userId: string, @Query('interviewId') interviewId: string) {
    return this.warmupService.getWarmupById(userId, interviewId);
  }

  @Post('/:id/answers')
  postWarmupAnswers(): WarmupsResponse {
    throw new Error('Not implemented');
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
