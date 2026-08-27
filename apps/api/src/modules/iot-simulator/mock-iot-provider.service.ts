import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { DeviceStatus, IIoTProvider, MetricType, TelemetryQuality } from '@yacht-platform/types';
import { TelemetryIngestionService } from '../telemetry/telemetry-ingestion.service';
import { AlertEngineService } from '../alert-engine/alert-engine.service';
import { GeofencingService } from '../geofencing/geofencing.service';

@Injectable()
export class MockIoTProviderService implements IIoTProvider, OnModuleInit, OnModuleDestroy {
  private timer: NodeJS.Timeout | null = null;
  private isSimulating = true;
  private tickIndex = 0;

  // Anomaly Injection Flags
  private activeAnomalies: { [yachtId: string]: string | null } = {};

  constructor(
    private readonly ingestionService: TelemetryIngestionService,
    private readonly alertService: AlertEngineService,
    private readonly geofenceService: GeofencingService,
  ) {}

  onModuleInit() {
    this.startSimulation();
  }

  onModuleDestroy() {
    this.stopSimulation();
  }

  public startSimulation() {
    if (this.timer) return;
    this.isSimulating = true;
    console.log('🤖 IoT Mock Simulator Started: Emitting periodic vessel telemetry...');

    this.timer = setInterval(() => {
      if (this.isSimulating) {
        this.emitSimulatedTick();
      }
    }, 5000); // 5-second telemetry tick interval
  }

  public stopSimulation() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.isSimulating = false;
    console.log('🛑 IoT Mock Simulator Stopped.');
  }

  public injectAnomaly(yachtId: string, anomalyType: string) {
    this.activeAnomalies[yachtId] = anomalyType;
    console.log(`⚠️ Anomaly Injected for Vessel #${yachtId}: ${anomalyType}`);
  }

  public clearAnomaly(yachtId: string) {
    this.activeAnomalies[yachtId] = null;
  }

  private async emitSimulatedTick() {
    this.tickIndex++;
    const orgId = 'org-1';

    // Vessel 1: Ocean Pearl 115 (Monaco Route)
    const y1Anomaly = this.activeAnomalies['y1'];
    const lat1 = y1Anomaly === 'GEOFENCE_EXIT' ? 43.8500 : 43.7374 + Math.sin(this.tickIndex * 0.1) * 0.005;
    const lng1 = y1Anomaly === 'GEOFENCE_EXIT' ? 7.6000 : 7.4273 + Math.cos(this.tickIndex * 0.1) * 0.005;
    const speed1 = y1Anomaly === 'HIGH_SPEED' ? 34.5 : 18.2;
    const battery1 = y1Anomaly === 'LOW_BATTERY' ? 11.2 : 12.8;
    const engineTemp1 = y1Anomaly === 'HIGH_ENGINE_TEMP' ? 98.4 : 84.0;

    await this.processVesselTick(orgId, 'y1', 'dev-1', [
      { metricType: MetricType.LATITUDE, value: lat1, unit: 'deg' },
      { metricType: MetricType.LONGITUDE, value: lng1, unit: 'deg' },
      { metricType: MetricType.SPEED, value: speed1, unit: 'knots' },
      { metricType: MetricType.HEADING, value: (142 + (this.tickIndex % 20)) % 360, unit: 'deg' },
      { metricType: MetricType.BATTERY_VOLTAGE, value: battery1, unit: 'V' },
      { metricType: MetricType.FUEL_LEVEL, value: Math.max(10, 78 - this.tickIndex * 0.05), unit: '%' },
      { metricType: MetricType.ENGINE_TEMP, value: engineTemp1, unit: 'degC' },
    ], lat1, lng1, speed1, battery1, engineTemp1);
  }

  private async processVesselTick(
    orgId: string,
    yachtId: string,
    deviceId: string,
    metrics: { metricType: MetricType; value: number; unit: string }[],
    lat: number,
    lng: number,
    speed: number,
    battery: number,
    engineTemp: number,
  ) {
    try {
      // 1. Ingest Normalized Telemetry
      await this.ingestionService.ingestTelemetry({
        deviceId,
        timestamp: new Date().toISOString(),
        eventId: `sim-${Date.now()}-${yachtId}`,
        metrics: metrics.map((m) => ({ ...m, quality: TelemetryQuality.GOOD })),
      });

      // 2. Evaluate Alert Rules (Battery, Speed, Engine Temp)
      await this.alertService.evaluateMetric(orgId, yachtId, deviceId, MetricType.BATTERY_VOLTAGE, battery);
      await this.alertService.evaluateMetric(orgId, yachtId, deviceId, MetricType.SPEED, speed);
      await this.alertService.evaluateMetric(orgId, yachtId, deviceId, MetricType.ENGINE_TEMP, engineTemp);

      // 3. Evaluate Geofence Entry/Exit
      await this.geofenceService.evaluateLocation(orgId, yachtId, deviceId, lat, lng);
    } catch (error) {
      console.warn(`[MockIoT Simulator] Tick skipped for ${deviceId} (Database empty or not initialized): ${error.message}`);
    }
  }

  // IIoTProvider Required Contract Implementation
  async registerDevice(organizationId: string, yachtId: string, dto: any): Promise<any> {
    return { device: { id: `dev-${Date.now()}`, ...dto }, credentials: { secretKey: 'sec_mock' } };
  }

  async authenticateDevice(deviceId: string, secretKey: string): Promise<boolean> {
    return true;
  }

  async receiveTelemetry(payload: any): Promise<any> {
    return this.ingestionService.ingestTelemetry(payload);
  }

  async getDeviceStatus(deviceId: string): Promise<DeviceStatus> {
    return DeviceStatus.ACTIVE;
  }

  async disconnectDevice(deviceId: string): Promise<void> {}
}
