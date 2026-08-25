import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getHealth() {
    const memoryUsage = process.memoryUsage();
    let dbStatus = 'HEALTHY';
    let latencyMs = 0;

    const start = Date.now();
    try {
      if (this.prisma.isOperational()) {
        await this.prisma.$queryRaw`SELECT 1`;
      }
      latencyMs = Date.now() - start;
    } catch (err) {
      dbStatus = 'DEGRADED';
    }

    return {
      status: dbStatus === 'HEALTHY' ? 'OK' : 'DEGRADED',
      timestamp: new Date().toISOString(),
      service: 'yacht-platform-api',
      environment: process.env.NODE_ENV || 'development',
      uptimeSeconds: Math.floor(process.uptime()),
      database: {
        status: dbStatus,
        latencyMs,
      },
      memory: {
        rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
        heapTotalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      },
    };
  }
}
