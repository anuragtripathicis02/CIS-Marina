import { Module } from '@nestjs/common';
import { YachtsController } from './yachts.controller';
import { YachtsService } from './yachts.service';

@Module({
  controllers: [YachtsController],
  providers: [YachtsService],
  exports: [YachtsService],
})
export class YachtsModule {}
