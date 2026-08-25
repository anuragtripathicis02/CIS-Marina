import { Module } from '@nestjs/common';
import { MockIoTProviderService } from './mock-iot-provider.service';
import { IoTSimulatorController } from './iot-simulator.controller';
import { TelemetryModule } from '../telemetry/telemetry.module';
import { AlertEngineModule } from '../alert-engine/alert-engine.module';
import { GeofencingModule } from '../geofencing/geofencing.module';

@Module({
  imports: [TelemetryModule, AlertEngineModule, GeofencingModule],
  controllers: [IoTSimulatorController],
  providers: [MockIoTProviderService],
  exports: [MockIoTProviderService],
})
export class IoTSimulatorModule {}
