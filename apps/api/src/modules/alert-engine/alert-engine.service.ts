import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AlertCategory, AlertSeverity, AlertStatus, MetricType } from '@yacht-platform/types';

@Injectable()
export class AlertEngineService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllRules(organizationId: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'rule-1',
          organizationId,
          metricType: MetricType.BATTERY_VOLTAGE,
          operator: '<',
          threshold: 11.5,
          severity: AlertSeverity.WARNING,
          category: AlertCategory.LOW_BATTERY,
          isEnabled: true,
          cooldownMinutes: 15,
        },
        {
          id: 'rule-2',
          organizationId,
          metricType: MetricType.BATTERY_VOLTAGE,
          operator: '<',
          threshold: 10.5,
          severity: AlertSeverity.CRITICAL,
          category: AlertCategory.LOW_BATTERY,
          isEnabled: true,
          cooldownMinutes: 15,
        },
        {
          id: 'rule-3',
          organizationId,
          metricType: MetricType.SPEED,
          operator: '>',
          threshold: 30.0,
          severity: AlertSeverity.WARNING,
          category: AlertCategory.HIGH_SPEED,
          isEnabled: true,
          cooldownMinutes: 10,
        },
        {
          id: 'rule-4',
          organizationId,
          metricType: MetricType.ENGINE_TEMP,
          operator: '>',
          threshold: 95.0,
          severity: AlertSeverity.CRITICAL,
          category: AlertCategory.HIGH_ENGINE_TEMPERATURE,
          isEnabled: true,
          cooldownMinutes: 15,
        },
      ];
    }

    return this.prisma.alertRule.findMany({
      where: { organizationId, isEnabled: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createRule(organizationId: string, dto: {
    yachtId?: string;
    deviceId?: string;
    metricType: MetricType;
    operator: string;
    threshold: number;
    severity: AlertSeverity;
    category: AlertCategory;
    cooldownMinutes?: number;
  }) {
    if (!this.prisma.isOperational()) {
      return {
        id: `rule-${Date.now()}`,
        organizationId,
        ...dto,
        isEnabled: true,
        cooldownMinutes: dto.cooldownMinutes || 15,
        createdAt: new Date().toISOString(),
      };
    }

    return this.prisma.alertRule.create({
      data: {
        organizationId,
        yachtId: dto.yachtId,
        deviceId: dto.deviceId,
        metricType: dto.metricType,
        operator: dto.operator || '<',
        threshold: dto.threshold,
        severity: dto.severity || AlertSeverity.WARNING,
        category: dto.category || AlertCategory.OTHER,
        cooldownMinutes: dto.cooldownMinutes || 15,
      },
    });
  }

  async findAllAlerts(organizationId: string, yachtId?: string, status?: AlertStatus) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'alt-101',
          organizationId,
          yachtId: yachtId || 'y1',
          category: AlertCategory.LOW_BATTERY,
          severity: AlertSeverity.WARNING,
          status: status || AlertStatus.OPEN,
          title: 'Low Auxiliary House Battery Voltage',
          message: 'Auxiliary House Battery Voltage dropped to 11.2V (Threshold < 11.5V).',
          metricType: MetricType.BATTERY_VOLTAGE,
          metricValue: 11.2,
          threshold: 11.5,
          triggerCount: 4,
          lastTriggeredAt: new Date().toISOString(),
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          yacht: { id: 'y1', name: 'Ocean Pearl 115' },
        },
        {
          id: 'alt-102',
          organizationId,
          yachtId: yachtId || 'y1',
          category: AlertCategory.HIGH_ENGINE_TEMPERATURE,
          severity: AlertSeverity.CRITICAL,
          status: status || AlertStatus.OPEN,
          title: 'Starboard Main Engine Overheating Risk',
          message: 'Starboard Engine Temp reached 97.5°C (Threshold > 95.0°C).',
          metricType: MetricType.ENGINE_TEMP,
          metricValue: 97.5,
          threshold: 95.0,
          triggerCount: 2,
          lastTriggeredAt: new Date().toISOString(),
          createdAt: new Date(Date.now() - 1800000).toISOString(),
          yacht: { id: 'y1', name: 'Ocean Pearl 115' },
        },
      ];
    }

    return this.prisma.alert.findMany({
      where: {
        organizationId,
        ...(yachtId ? { yachtId } : {}),
        ...(status ? { status } : {}),
      },
      include: { yacht: true, device: true },
      orderBy: { lastTriggeredAt: 'desc' },
    });
  }

  /**
   * Process Telemetry Event & Evaluate Rules with Deduplication (Requirement 28 & Critical Test 1)
   */
  async evaluateMetric(organizationId: string, yachtId: string, deviceId: string, metricType: MetricType, value: number) {
    if (!this.prisma.isOperational()) {
      return { evaluated: true, value };
    }

    const rules = await this.prisma.alertRule.findMany({
      where: {
        organizationId,
        metricType,
        isEnabled: true,
        OR: [{ yachtId: null }, { yachtId }],
      },
    });

    for (const rule of rules) {
      let isBreach = false;
      if (rule.operator === '<' && value < rule.threshold) isBreach = true;
      if (rule.operator === '<=' && value <= rule.threshold) isBreach = true;
      if (rule.operator === '>' && value > rule.threshold) isBreach = true;
      if (rule.operator === '>=' && value >= rule.threshold) isBreach = true;

      if (isBreach) {
        // Check for existing OPEN alert (Deduplication / Cooldown Guard)
        const existingAlert = await this.prisma.alert.findFirst({
          where: {
            organizationId,
            yachtId,
            metricType,
            status: AlertStatus.OPEN,
          },
        });

        if (existingAlert) {
          // UPDATE EXISTING ALERT (Deduplication Requirement)
          await this.prisma.alert.update({
            where: { id: existingAlert.id },
            data: {
              triggerCount: existingAlert.triggerCount + 1,
              metricValue: value,
              lastTriggeredAt: new Date(),
              message: `${rule.category} breach updated: ${metricType} = ${value} (Threshold ${rule.operator} ${rule.threshold})`,
            },
          });
        } else {
          // CREATE NEW ALERT
          await this.prisma.alert.create({
            data: {
              organizationId,
              yachtId,
              deviceId,
              ruleId: rule.id,
              category: rule.category,
              severity: rule.severity,
              status: AlertStatus.OPEN,
              title: `${rule.category.replace('_', ' ')} Alert`,
              message: `${metricType} value ${value} breached threshold (${rule.operator} ${rule.threshold})`,
              metricType,
              metricValue: value,
              threshold: rule.threshold,
              triggerCount: 1,
              lastTriggeredAt: new Date(),
            },
          });
        }
      }
    }

    return { evaluated: true };
  }

  async transitionAlertStatus(organizationId: string, alertId: string, status: AlertStatus, userId?: string, notes?: string) {
    if (!this.prisma.isOperational()) {
      return { id: alertId, status, notes, updatedAt: new Date().toISOString() };
    }

    return this.prisma.alert.update({
      where: { id: alertId },
      data: {
        status,
        notes,
        ...(status === AlertStatus.ACKNOWLEDGED ? { acknowledgedById: userId, acknowledgedAt: new Date() } : {}),
        ...(status === AlertStatus.RESOLVED ? { resolvedById: userId, resolvedAt: new Date() } : {}),
      },
    });
  }

  /**
   * Convert Alert into Maintenance Recommendation (Requirement 42)
   */
  async convertAlertToMaintenanceRecommendation(organizationId: string, alertId: string) {
    if (!this.prisma.isOperational()) {
      return {
        success: true,
        recommendationId: `rec-${Date.now()}`,
        title: 'Maintenance Recommendation: High Engine Temperature',
        priority: 'HIGH',
      };
    }

    const alert = await this.prisma.alert.findUnique({
      where: { id: alertId },
    });

    if (!alert) throw new NotFoundException(`Alert #${alertId} not found`);

    const record = await this.prisma.maintenanceRecord.create({
      data: {
        organizationId,
        yachtId: alert.yachtId,
        title: `Telemetry Alert Recommendation: ${alert.title}`,
        description: `Automated maintenance recommendation triggered by alert #${alert.id}: ${alert.message}`,
        priority: alert.severity === AlertSeverity.CRITICAL ? 'HIGH' : 'MEDIUM',
        status: 'REPORTED',
        isBlocking: alert.severity === AlertSeverity.CRITICAL,
      },
    });

    await this.prisma.alert.update({
      where: { id: alertId },
      data: { status: AlertStatus.ACKNOWLEDGED, notes: `Converted to maintenance record #${record.id}` },
    });

    return record;
  }
}
