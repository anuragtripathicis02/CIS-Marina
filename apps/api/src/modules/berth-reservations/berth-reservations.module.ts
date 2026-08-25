import { Module } from '@nestjs/common';
import { BerthReservationsService } from './berth-reservations.service';
import { BerthReservationsController } from './berth-reservations.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BerthReservationsController],
  providers: [BerthReservationsService],
  exports: [BerthReservationsService],
})
export class BerthReservationsModule {}
