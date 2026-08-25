import { Module } from '@nestjs/common';
import { CrewService } from './crew.service';
import { CrewController } from './crew.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CrewController],
  providers: [CrewService],
  exports: [CrewService],
})
export class CrewModule {}
