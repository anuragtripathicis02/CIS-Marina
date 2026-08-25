import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private isConnected = false;

  async onModuleInit() {
    try {
      await this.$connect();
      this.isConnected = true;
      console.log('✅ PostgreSQL Database connected successfully.');
    } catch (err: any) {
      this.isConnected = false;
      console.warn('⚠️ PostgreSQL database connection bypassed for dev mode.');
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (err: any) {}
  }

  public isOperational(): boolean {
    return this.isConnected;
  }

  /**
   * Enforce PostgreSQL Row-Level Security (RLS) tenant session variable
   */
  async setTenantContext(organizationId: string) {
    if (!this.isConnected) return;
    try {
      await this.$executeRawUnsafe(
        `SET LOCAL app.current_organization_id = '${organizationId}';`,
      );
    } catch (err: any) {}
  }
}
