import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}
  async checkDbConnection(): Promise<string> {
    try {
      await this.databaseService.checkConnection();
      return 'Database connection is working';
    } catch (error) {
      return 'Database connection is not working';
    }
  }
}
