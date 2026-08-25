import { Module } from '@nestjs/common';
import { MarinaServicesService } from './marina-services.service';
import { MarinaServicesController } from './marina-services.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MarinaServicesController],
  providers: [MarinaServicesService],
  exports: [MarinaServicesService],
})
export class MarinaServicesModule {}
