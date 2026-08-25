import { Module } from '@nestjs/common';
import { RevenueAnalyticsService } from './revenue-analytics.service';
import { RevenueAnalyticsController } from './revenue-analytics.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RevenueAnalyticsController],
  providers: [RevenueAnalyticsService],
  exports: [RevenueAnalyticsService],
})
export class RevenueAnalyticsModule {}
