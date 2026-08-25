import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Currency } from '@yacht-platform/types';

export class CreateYachtDto {
  @ApiProperty({ example: 'Ocean Pearl 115' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'MON-9821' })
  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @ApiPropertyOptional({ example: 'Majesty Yachts' })
  @IsString()
  @IsOptional()
  make?: string;

  @ApiPropertyOptional({ example: '115 Superyacht' })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiPropertyOptional({ example: 2022 })
  @IsInt()
  @IsOptional()
  yearBuilt?: number;

  @ApiPropertyOptional({ example: 115.5 })
  @IsNumber()
  @IsOptional()
  lengthFt?: number;

  @ApiProperty({ example: 12 })
  @IsInt()
  @Min(1)
  capacityPassengers: number;

  @ApiPropertyOptional({ example: 5 })
  @IsInt()
  @IsOptional()
  cabins?: number;

  @ApiPropertyOptional({ example: 6 })
  @IsInt()
  @IsOptional()
  bathrooms?: number;

  @ApiProperty({ example: 2500.00 })
  @IsNumber()
  @Min(0)
  hourlyRate: number;

  @ApiProperty({ example: 18000.00 })
  @IsNumber()
  @Min(0)
  dailyRate: number;

  @ApiPropertyOptional({ enum: Currency, example: Currency.EUR })
  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;
}
