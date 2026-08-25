import { Controller, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TelemetryIngestionService } from './telemetry-ingestion.service';

@Controller('telemetry')
export class TelemetryStreamController {
  @Sse('stream')
  streamTelemetry(): Observable<{ data: any }> {
    return TelemetryIngestionService.telemetryStream$.asObservable().pipe(
      map((event) => ({
        data: event,
      })),
    );
  }
}
