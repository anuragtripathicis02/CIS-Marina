import { Module } from '@nestjs/common';
import { YachtClubService } from './yacht-club.service';
import { YachtClubController } from './yacht-club.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [YachtClubController],
  providers: [YachtClubService],
  exports: [YachtClubService],
})
export class YachtClubModule {}
