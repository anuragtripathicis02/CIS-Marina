# DEVICE INTEGRATION & ADAPTER SPECIFICATION

## Supported Device Types
1. `GPS`: Telematics gateways reporting latitude, longitude, speed, and heading.
2. `ENGINE`: CANBus engine monitors reporting RPM, temperature (°C), and engine hours.
3. `FUEL`: Tank level sensors reporting fuel percentage (%) or volume.
4. `BATTERY`: Battery bank monitors reporting voltage (V) and charge state (%).
5. `BILGE`: Water level float switches reporting water depth (mm) and alert status (`NORMAL`, `WARNING`, `CRITICAL`).
6. `TEMPERATURE`: Engine room, cabin, and refrigeration sensors (°C).

---

## Hardware Integration Requirements for Future Adapters
1. Obtain official manufacturer API credentials / webhook gateway specifications.
2. Create adapter class implementing `IIoTProvider`.
3. Register adapter in NestJS `DevicesModule`.
4. Translate manufacturer payload formats into `ITelemetryIngestionPayload`.
