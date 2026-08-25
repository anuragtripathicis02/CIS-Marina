import { Module } from '@nestjs/common';
import { KpiService } from './kpi.service';
import { RevenueForecastService } from './revenue-forecast.service';
import { FleetPredictiveService } from './fleet-predictive.service';
import { MarinaAnalyticsService } from './marina-analytics.service';
import { CustomerIntelligenceService } from './customer-intelligence.service';
import { AiAnalyticsService } from './ai-analytics.service';
import { ReportsBuilderService } from './reports-builder.service';
import { AnalyticsController } from './analytics.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AnalyticsController],
  providers: [
    KpiService,
    RevenueForecastService,
    FleetPredictiveService,
    MarinaAnalyticsService,
    CustomerIntelligenceService,
    AiAnalyticsService,
    ReportsBuilderService,
  ],
  exports: [
    KpiService,
    RevenueForecastService,
    FleetPredictiveService,
    MarinaAnalyticsService,
    CustomerIntelligenceService,
    AiAnalyticsService,
    ReportsBuilderService,
  ],
})
export class AnalyticsModule {}
