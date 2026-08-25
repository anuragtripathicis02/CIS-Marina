import { Module } from '@nestjs/common';
import { TelemetryIngestionService } from './telemetry-ingestion.service';
import { TelemetryHistoryService } from './telemetry-history.service';
import { TelemetryController } from './telemetry.controller';
import { TelemetryStreamController } from './telemetry-stream.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TelemetryController, TelemetryStreamController],
  providers: [TelemetryIngestionService, TelemetryHistoryService],
  exports: [TelemetryIngestionService, TelemetryHistoryService],
})
export class TelemetryModule {}
