import { Module } from '@nestjs/common';
import { CustomerPortalService } from './customer-portal.service';
import { ConciergeService } from './concierge.service';
import { SupportTicketsService } from './support-tickets.service';
import { CustomerPortalController } from './customer-portal.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerPortalController],
  providers: [CustomerPortalService, ConciergeService, SupportTicketsService],
  exports: [CustomerPortalService, ConciergeService, SupportTicketsService],
})
export class CustomerPortalModule {}
