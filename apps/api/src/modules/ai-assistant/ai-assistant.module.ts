import { Module } from '@nestjs/common';
import { AiAssistantService } from './ai-assistant.service';
import { AiProviderService } from './ai-provider.service';
import { AiAssistantController } from './ai-assistant.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AiAssistantController],
  providers: [AiAssistantService, AiProviderService],
  exports: [AiAssistantService, AiProviderService],
})
export class AiAssistantModule {}
