import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { CountryConfigService } from './country-config.service';
import { CurrencyExchangeService } from './currency-exchange.service';
import { SubscriptionsService } from './subscriptions.service';
import { ComplianceService } from './compliance.service';
import { SystemHealthService } from './system-health.service';
import { EnterpriseController } from './enterprise.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EnterpriseController],
  providers: [
    BranchesService,
    CountryConfigService,
    CurrencyExchangeService,
    SubscriptionsService,
    ComplianceService,
    SystemHealthService,
  ],
  exports: [
    BranchesService,
    CountryConfigService,
    CurrencyExchangeService,
    SubscriptionsService,
    ComplianceService,
    SystemHealthService,
  ],
})
export class EnterpriseModule {}
