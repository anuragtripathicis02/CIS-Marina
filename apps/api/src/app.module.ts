import { Module } from '@nestjs/common';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { UsersModule } from './modules/users/users.module';
import { YachtsModule } from './modules/yachts/yachts.module';
import { CustomersModule } from './modules/customers/customers.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { LeadsModule } from './modules/leads/leads.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

// Phase 2 Modules
import { CrewModule } from './modules/crew/crew.module';
import { CrewAssignmentsModule } from './modules/crew-assignments/crew-assignments.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';
import { InspectionsModule } from './modules/inspections/inspections.module';
import { ChecklistsModule } from './modules/checklists/checklists.module';
import { VendorsModule } from './modules/vendors/vendors.module';
import { OperationsModule } from './modules/operations/operations.module';

// Phase 3 IoT Modules
import { DevicesModule } from './modules/devices/devices.module';
import { TelemetryModule } from './modules/telemetry/telemetry.module';
import { AlertEngineModule } from './modules/alert-engine/alert-engine.module';
import { GeofencingModule } from './modules/geofencing/geofencing.module';
import { IoTSimulatorModule } from './modules/iot-simulator/iot-simulator.module';

// Phase 4 Marina & Yacht Club Modules
import { MarinaModule } from './modules/marina/marina.module';
import { BerthReservationsModule } from './modules/berth-reservations/berth-reservations.module';
import { MarinaServicesModule } from './modules/marina-services/marina-services.module';
import { MarinaContractsModule } from './modules/marina-contracts/marina-contracts.module';
import { YachtClubModule } from './modules/yacht-club/yacht-club.module';

// Phase 5 AI, CRM, Automation & Revenue Intelligence Modules
import { CrmModule } from './modules/crm/crm.module';
import { AutomationsModule } from './modules/automations/automations.module';
import { AiAssistantModule } from './modules/ai-assistant/ai-assistant.module';
import { RevenueAnalyticsModule } from './modules/revenue-analytics/revenue-analytics.module';

// Phase 6 Customer Portal & Concierge Module
import { CustomerPortalModule } from './modules/customer-portal/customer-portal.module';

// Phase 7 Enterprise & Compliance Module
import { EnterpriseModule } from './modules/enterprise/enterprise.module';

// Phase 8 Advanced Analytics & Executive Dashboard Module
import { AnalyticsModule } from './modules/analytics/analytics.module';

// Phase 11 Health & Readiness Probes Module
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    OrganizationsModule,
    UsersModule,
    YachtsModule,
    CustomersModule,
    BookingsModule,
    PaymentsModule,
    NotificationsModule,
    AuditLogsModule,
    LeadsModule,
    DashboardModule,
    // Phase 2
    CrewModule,
    CrewAssignmentsModule,
    MaintenanceModule,
    InspectionsModule,
    ChecklistsModule,
    VendorsModule,
    OperationsModule,
    // Phase 3
    DevicesModule,
    TelemetryModule,
    AlertEngineModule,
    GeofencingModule,
    IoTSimulatorModule,
    // Phase 4
    MarinaModule,
    BerthReservationsModule,
    MarinaServicesModule,
    MarinaContractsModule,
    YachtClubModule,
    // Phase 5
    CrmModule,
    AutomationsModule,
    AiAssistantModule,
    RevenueAnalyticsModule,
    // Phase 6
    CustomerPortalModule,
    // Phase 7
    EnterpriseModule,
    // Phase 8
    AnalyticsModule,
    // Phase 11
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
