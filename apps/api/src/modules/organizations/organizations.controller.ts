import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { OnboardOrganizationDto } from './dto/onboard-organization.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { IApiResponse } from '@yacht-platform/types';

@ApiTags('Organization & Onboarding')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly orgsService: OrganizationsService) {}

  @Post('onboard')
  @ApiOperation({ summary: 'Onboard new organization workspace' })
  async onboard(
    @CurrentUser('id') userId: string,
    @Body() dto: OnboardOrganizationDto,
  ): Promise<IApiResponse> {
    const org = await this.orgsService.onboard(userId, dto);
    return {
      success: true,
      data: org,
      meta: { timestamp: new Date().toISOString(), correlationId: `org-${org.id}` },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization details' })
  async getOrganization(@Param('id') id: string): Promise<IApiResponse> {
    const org = await this.orgsService.getOrganizationById(id);
    return {
      success: true,
      data: org,
      meta: { timestamp: new Date().toISOString(), correlationId: `org-${id}` },
    };
  }
}
