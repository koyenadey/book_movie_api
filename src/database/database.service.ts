import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }

  async checkConnection(): Promise<void> {
    try {
      await this.$queryRaw`SELECT 1`;
    } catch (error) {
      console.log(error.message);
      throw new Error('Database connection failed');
    }
  }
}
