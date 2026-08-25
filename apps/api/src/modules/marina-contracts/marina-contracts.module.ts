import { Module } from '@nestjs/common';
import { MarinaContractsService } from './marina-contracts.service';
import { MarinaContractsController } from './marina-contracts.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MarinaContractsController],
  providers: [MarinaContractsService],
  exports: [MarinaContractsService],
})
export class MarinaContractsModule {}
