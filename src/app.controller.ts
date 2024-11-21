import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHealth(): Promise<string> {
    const result = await this.appService.checkDbConnection();
    return result;
  }
}
