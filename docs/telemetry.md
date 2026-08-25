# TELEMETRY & TIME-SERIES SPECIFICATION

## Metric Normalization Rules
Different hardware manufacturers report raw metric values in varying formats. The ingestion pipeline normalizes values upon arrival:

| Metric Type | Raw Input Format | Normalized Unit | Normalization Formula |
| :--- | :--- | :--- | :--- |
| `FUEL_LEVEL` | Decimal `0.0 - 1.0` | Percentage `%` | `value * 100` |
| `SPEED` | Knots or m/s | Knots `kts` | Standardized to knots |
| `BATTERY_VOLTAGE` | Volts | Volts `V` | Standardized to Volts |
| `ENGINE_TEMP` | Celsius | Celsius `°C` | Standardized to °C |

---

## Retention Policy & Aggregation
- **Raw Telemetry (`telemetry_records`)**: Preserved for 30–90 days per environment retention configuration.
- **Aggregated Telemetry (`telemetry_aggregates`)**: Hourly and daily rollups (`avgValue`, `minValue`, `maxValue`, `sampleCount`) stored indefinitely for multi-year historical trend charts.
