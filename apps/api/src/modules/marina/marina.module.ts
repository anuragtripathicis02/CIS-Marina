import { Module } from '@nestjs/common';
import { MarinaService } from './marina.service';
import { MarinaController } from './marina.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MarinaController],
  providers: [MarinaService],
  exports: [MarinaService],
})
export class MarinaModule {}
