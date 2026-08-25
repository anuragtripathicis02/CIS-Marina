import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BusinessType, Currency } from '@yacht-platform/types';

export class OnboardOrganizationDto {
  @ApiProperty({ example: 'Monaco Charter Fleet' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: BusinessType, example: BusinessType.YACHT_CHARTER })
  @IsEnum(BusinessType)
  @IsNotEmpty()
  businessType: BusinessType;

  @ApiProperty({ example: 'Monaco' })
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @ApiPropertyOptional({ enum: Currency, example: Currency.EUR })
  @IsEnum(Currency)
  @IsOptional()
  defaultCurrency?: Currency;

  @ApiPropertyOptional({ example: 'Europe/Paris' })
  @IsString()
  @IsOptional()
  timezone?: string;
}
