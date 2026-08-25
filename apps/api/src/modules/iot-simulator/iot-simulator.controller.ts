import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MockIoTProviderService } from './mock-iot-provider.service';
import { TenantGuard } from '../../common/guards/tenant.guard';

@Controller('simulator')
@UseGuards(TenantGuard)
export class IoTSimulatorController {
  constructor(private readonly simulatorService: MockIoTProviderService) {}

  @Post('start')
  startSimulation() {
    this.simulatorService.startSimulation();
    return { success: true, message: 'IoT Simulator Started' };
  }

  @Post('stop')
  stopSimulation() {
    this.simulatorService.stopSimulation();
    return { success: true, message: 'IoT Simulator Stopped' };
  }

  @Post('inject-anomaly')
  injectAnomaly(@Body() dto: { yachtId: string; anomalyType: string }) {
    this.simulatorService.injectAnomaly(dto.yachtId || 'y1', dto.anomalyType);
    return { success: true, message: `Anomaly ${dto.anomalyType} injected for yacht #${dto.yachtId || 'y1'}` };
  }

  @Post('clear-anomaly')
  clearAnomaly(@Body() dto: { yachtId: string }) {
    this.simulatorService.clearAnomaly(dto.yachtId || 'y1');
    return { success: true, message: `Anomalies cleared for yacht #${dto.yachtId || 'y1'}` };
  }
}
