# IoT ARCHITECTURE & DATA FLOW SPECIFICATION

## 1. Provider Abstraction Layer (`IIoTProvider`)
All IoT hardware integrations communicate through the `IIoTProvider` interface:

```typescript
export interface IIoTProvider {
  registerDevice(organizationId: string, yachtId: string, dto: Partial<IDevice>): Promise<{ device: IDevice; credentials: IDeviceCredentials }>;
  authenticateDevice(deviceId: string, secretKey: string): Promise<boolean>;
  receiveTelemetry(payload: ITelemetryIngestionPayload): Promise<{ ingestedCount: number }>;
  getDeviceStatus(deviceId: string): Promise<DeviceStatus>;
  disconnectDevice(deviceId: string): Promise<void>;
}
```

The system defaults to `MockIoTProviderService` for development and testing without physical hardware, while supporting future adapters (`FutureGPSProvider`, `FutureMarineIoTProvider`, `FutureCustomProvider`).

---

## 2. Security & Authentication
Device authentication is decoupled from User JWT authentication:
- Devices present dedicated secret keys (`x-device-token`) during HTTP POST to `/api/v1/telemetry/ingest`.
- Tokens are hashed using SHA-256 before validation.
- Tenant isolation is strictly enforced by resolving `organizationId` and `yachtId` from the authenticated device record.

---

## 3. Real-Time SSE Transport
Frontend dashboards subscribe to Server-Sent Events at `/api/v1/telemetry/stream`. When normalized telemetry is ingested, events are broadcast via RxJS `Subject` to all connected clients, enabling instant map position and gauge updates without polling.
