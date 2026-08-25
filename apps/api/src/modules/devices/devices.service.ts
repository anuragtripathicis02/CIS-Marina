import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { DeviceStatus, DeviceType } from '@yacht-platform/types';
import * as crypto from 'crypto';

@Injectable()
export class DevicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(organizationId: string, yachtId?: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'dev-1',
          organizationId,
          yachtId: yachtId || 'y1',
          deviceName: 'Ocean Pearl GPS Telematics Gateway',
          deviceType: DeviceType.GPS,
          manufacturer: 'Teltonika Marine',
          model: 'FMB204-GPS',
          serialNumber: 'SN-99481-GPS',
          firmwareVersion: 'v2.4.12',
          status: DeviceStatus.ACTIVE,
          lastSeenAt: new Date(Date.now() - 12000).toISOString(),
          installedAt: '2026-01-10T00:00:00.000Z',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          yacht: { id: 'y1', name: 'Ocean Pearl 115' },
        },
        {
          id: 'dev-2',
          organizationId,
          yachtId: yachtId || 'y1',
          deviceName: 'Starboard Main Engine CanBus Monitor',
          deviceType: DeviceType.ENGINE,
          manufacturer: 'Caterpillar Marine',
          model: 'CAT-CAN-v4',
          serialNumber: 'SN-88219-ENG',
          firmwareVersion: 'v1.8.0',
          status: DeviceStatus.ACTIVE,
          lastSeenAt: new Date(Date.now() - 30000).toISOString(),
          installedAt: '2026-01-10T00:00:00.000Z',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          yacht: { id: 'y1', name: 'Ocean Pearl 115' },
        },
        {
          id: 'dev-3',
          organizationId,
          yachtId: yachtId || 'y1',
          deviceName: 'Forward Engine Room Bilge Sensor',
          deviceType: DeviceType.BILGE,
          manufacturer: 'Rule Marine Systems',
          model: 'RM-BILGE-200',
          serialNumber: 'SN-44102-BLG',
          firmwareVersion: 'v1.0.4',
          status: DeviceStatus.ACTIVE,
          lastSeenAt: new Date(Date.now() - 45000).toISOString(),
          installedAt: '2026-02-01T00:00:00.000Z',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          yacht: { id: 'y1', name: 'Ocean Pearl 115' },
        },
      ];
    }

    return this.prisma.device.findMany({
      where: {
        organizationId,
        ...(yachtId ? { yachtId } : {}),
      },
      include: {
        yacht: true,
        credentials: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(organizationId: string, id: string) {
    if (!this.prisma.isOperational()) {
      const all = await this.findAll(organizationId);
      const found = all.find((d) => d.id === id);
      if (!found) throw new NotFoundException(`Device #${id} not found`);
      return found;
    }

    const device = await this.prisma.device.findFirst({
      where: { id, organizationId },
      include: {
        yacht: true,
        credentials: true,
        events: { orderBy: { timestamp: 'desc' }, take: 10 },
      },
    });

    if (!device) throw new NotFoundException(`Device #${id} not found`);
    return device;
  }

  async registerDevice(organizationId: string, dto: {
    yachtId?: string;
    deviceName: string;
    deviceType: DeviceType;
    manufacturer?: string;
    model?: string;
    serialNumber?: string;
    firmwareVersion?: string;
  }) {
    const rawSecret = `sec_${crypto.randomBytes(16).toString('hex')}`;
    const secretHash = crypto.createHash('sha256').update(rawSecret).digest('hex');

    if (!this.prisma.isOperational()) {
      const deviceId = `dev-${Date.now()}`;
      return {
        device: {
          id: deviceId,
          organizationId,
          ...dto,
          status: DeviceStatus.ACTIVE,
          lastSeenAt: new Date().toISOString(),
          installedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        credentials: {
          deviceId,
          secretKey: rawSecret,
          tokenHash: secretHash,
        },
      };
    }

    const device = await this.prisma.device.create({
      data: {
        organizationId,
        yachtId: dto.yachtId,
        deviceName: dto.deviceName,
        deviceType: dto.deviceType,
        manufacturer: dto.manufacturer,
        model: dto.model,
        serialNumber: dto.serialNumber,
        firmwareVersion: dto.firmwareVersion || 'v1.0.0',
        status: DeviceStatus.ACTIVE,
        installedAt: new Date(),
        credentials: {
          create: {
            tokenHash: secretHash,
            secretMask: `${rawSecret.substring(0, 8)}...`,
          },
        },
        events: {
          create: {
            organizationId,
            eventType: 'DEVICE_REGISTERED',
            payload: { deviceName: dto.deviceName, deviceType: dto.deviceType },
          },
        },
      },
      include: { credentials: true, yacht: true },
    });

    return {
      device,
      credentials: {
        deviceId: device.id,
        secretKey: rawSecret,
        tokenHash: secretHash,
      },
    };
  }

  async updateStatus(organizationId: string, deviceId: string, status: DeviceStatus) {
    if (!this.prisma.isOperational()) {
      return { id: deviceId, status, updatedAt: new Date().toISOString() };
    }

    return this.prisma.device.update({
      where: { id: deviceId },
      data: { status, updatedAt: new Date() },
    });
  }
}
