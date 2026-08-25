import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BusinessType, FleetSize } from '@yacht-platform/types';

export class CreateLeadDto {
  @ApiProperty({ example: 'Alexander', description: 'First name of the lead contact' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Vanderbilt', description: 'Last name of the lead contact' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'Monaco Yacht Charters', description: 'Company or entity name' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({ enum: BusinessType, example: BusinessType.YACHT_CHARTER })
  @IsEnum(BusinessType)
  @IsNotEmpty()
  businessType: BusinessType;

  @ApiProperty({ example: 'Monaco', description: 'Country of operation' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiPropertyOptional({ enum: FleetSize, example: FleetSize.SIZE_6_20 })
  @IsEnum(FleetSize)
  @IsOptional()
  fleetSize?: FleetSize;

  @ApiPropertyOptional({ example: '3 Marinas', description: 'Number of operating locations' })
  @IsString()
  @IsOptional()
  locations?: string;

  @ApiPropertyOptional({ example: 'Spreadsheets & Manual Emails', description: 'Current software or system used' })
  @IsString()
  @IsOptional()
  currentSoftware?: string;

  @ApiPropertyOptional({ example: 'Managing double bookings and scheduling crew', description: 'Primary operational challenge' })
  @IsString()
  @IsOptional()
  challenge?: string;

  @ApiProperty({ example: 'alexander@monacoyachts.com', description: 'Business email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ example: '+377 98 99 00 11', description: 'Contact phone number' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'Interested in enterprise fleet management demo.', description: 'Additional message or notes' })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({ example: 'marketing_website', description: 'Lead source tracking tag' })
  @IsString()
  @IsOptional()
  source?: string;
}
