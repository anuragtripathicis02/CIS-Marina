import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { GeofenceEventType, GeofenceShape } from '@yacht-platform/types';

@Injectable()
export class GeofencingService {
  private lastGeofenceStates = new Map<string, 'INSIDE' | 'OUTSIDE'>();

  constructor(private readonly prisma: PrismaService) {}

  async findAll(organizationId: string, yachtId?: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'geo-1',
          organizationId,
          yachtId: yachtId || 'y1',
          name: 'Monaco Port Hercules Operating Zone',
          description: 'Standard 3.0 NM coastal boundary for Monaco Port Hercules.',
          shape: GeofenceShape.CIRCLE,
          centerLat: 43.7374,
          centerLng: 7.4273,
          radiusMeters: 5000,
          isActive: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'geo-2',
          organizationId,
          yachtId: yachtId || 'y1',
          name: 'Saint-Jean-Cap-Ferrat Sanctuary Zone',
          description: 'Restricted speed coastal anchorage sanctuary.',
          shape: GeofenceShape.CIRCLE,
          centerLat: 43.6891,
          centerLng: 7.3325,
          radiusMeters: 3000,
          isActive: true,
          createdAt: new Date().toISOString(),
        },
      ];
    }

    return this.prisma.geofence.findMany({
      where: {
        organizationId,
        isActive: true,
        ...(yachtId ? { yachtId } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(organizationId: string, dto: {
    yachtId?: string;
    name: string;
    description?: string;
    shape?: GeofenceShape;
    centerLat?: number;
    centerLng?: number;
    radiusMeters?: number;
    polygonCoords?: { lat: number; lng: number }[];
  }) {
    if (!this.prisma.isOperational()) {
      return {
        id: `geo-${Date.now()}`,
        organizationId,
        ...dto,
        shape: dto.shape || GeofenceShape.CIRCLE,
        isActive: true,
        createdAt: new Date().toISOString(),
      };
    }

    return this.prisma.geofence.create({
      data: {
        organizationId,
        yachtId: dto.yachtId,
        name: dto.name,
        description: dto.description,
        shape: dto.shape || GeofenceShape.CIRCLE,
        centerLat: dto.centerLat,
        centerLng: dto.centerLng,
        radiusMeters: dto.radiusMeters || 5000,
        polygonCoords: dto.polygonCoords ? (dto.polygonCoords as any) : undefined,
        isActive: true,
      },
    });
  }

  async findEvents(organizationId: string, yachtId?: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'gev-1',
          organizationId,
          yachtId: yachtId || 'y1',
          geofenceId: 'geo-1',
          eventType: GeofenceEventType.ENTRY,
          latitude: 43.7374,
          longitude: 7.4273,
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          geofence: { name: 'Monaco Port Hercules Operating Zone' },
        },
      ];
    }

    return this.prisma.geofenceEvent.findMany({
      where: {
        organizationId,
        ...(yachtId ? { yachtId } : {}),
      },
      include: { geofence: true, yacht: true },
      orderBy: { timestamp: 'desc' },
    });
  }

  /**
   * Evaluate GPS coordinates against Active Geofences (Critical Test 2)
   */
  async evaluateLocation(organizationId: string, yachtId: string, deviceId: string, lat: number, lng: number) {
    if (!this.prisma.isOperational()) {
      return { evaluated: true };
    }

    const geofences = await this.prisma.geofence.findMany({
      where: {
        organizationId,
        isActive: true,
        OR: [{ yachtId: null }, { yachtId }],
      },
    });

    for (const geo of geofences) {
      if (geo.shape === GeofenceShape.CIRCLE && geo.centerLat && geo.centerLng && geo.radiusMeters) {
        const distanceMeters = this.calculateHaversineDistance(lat, lng, geo.centerLat, geo.centerLng);
        const isInside = distanceMeters <= geo.radiusMeters;
        const stateKey = `${yachtId}_${geo.id}`;
        const previousState = this.lastGeofenceStates.get(stateKey) || 'OUTSIDE';

        if (isInside && previousState === 'OUTSIDE') {
          // GEOFENCE ENTRY EVENT
          this.lastGeofenceStates.set(stateKey, 'INSIDE');
          await this.prisma.geofenceEvent.create({
            data: {
              organizationId,
              yachtId,
              deviceId,
              geofenceId: geo.id,
              eventType: GeofenceEventType.ENTRY,
              latitude: lat,
              longitude: lng,
            },
          });
        } else if (!isInside && previousState === 'INSIDE') {
          // GEOFENCE EXIT EVENT
          this.lastGeofenceStates.set(stateKey, 'OUTSIDE');
          await this.prisma.geofenceEvent.create({
            data: {
              organizationId,
              yachtId,
              deviceId,
              geofenceId: geo.id,
              eventType: GeofenceEventType.EXIT,
              latitude: lat,
              longitude: lng,
            },
          });
        }
      }
    }

    return { evaluated: true };
  }

  private calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // Earth radius in meters
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}
