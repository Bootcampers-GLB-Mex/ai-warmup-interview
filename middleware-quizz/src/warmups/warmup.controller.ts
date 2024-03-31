import { Controller, Get, Param, Post } from '@nestjs/common';
import { WarmupsResponse } from './responses.schema';
import { WarmupsRequestDTO } from './requests.dto';
// import { AppService } from './app.service';

@Controller('/warmups')
export class WarmupController {
  // constructor(private readonly appService: AppService) {}

  @Get()
  getWarmups(@Param() params: WarmupsRequestDTO): WarmupsResponse {
    throw new Error('Not implemented' + params);
  }

  @Get('/:access_code')
  getWarmup(): WarmupsResponse {
    throw new Error('Not implemented');
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
