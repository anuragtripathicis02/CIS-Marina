import { Module } from '@nestjs/common';
import { CrmLeadsService } from './crm-leads.service';
import { CrmActivitiesService } from './crm-activities.service';
import { CrmController } from './crm.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CrmController],
  providers: [CrmLeadsService, CrmActivitiesService],
  exports: [CrmLeadsService, CrmActivitiesService],
})
export class CrmModule {}
