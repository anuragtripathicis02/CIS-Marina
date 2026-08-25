import { Module } from '@nestjs/common';
import { CrewAssignmentsService } from './crew-assignments.service';
import { CrewAssignmentsController } from './crew-assignments.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CrewAssignmentsController],
  providers: [CrewAssignmentsService],
  exports: [CrewAssignmentsService],
})
export class CrewAssignmentsModule {}
