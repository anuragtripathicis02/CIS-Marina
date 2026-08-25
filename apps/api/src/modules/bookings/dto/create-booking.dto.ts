import { IsArray, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BookingAddonInputDto {
  @ApiProperty({ example: 'Gourmet French Catering' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'CATERING' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 2500.00 })
  @IsNumber()
  @Min(0)
  unitPrice: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateBookingDto {
  @ApiProperty({ example: 'yacht-uuid-1234' })
  @IsString()
  @IsNotEmpty()
  yachtId: string;

  @ApiProperty({ example: '2026-09-01T10:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ example: '2026-09-01T18:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  passengerCount: number;

  @ApiPropertyOptional({ example: 'Customer First Name' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Customer Last Name' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({ example: 'guest@company.com' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ type: [BookingAddonInputDto] })
  @IsArray()
  @IsOptional()
  addons?: BookingAddonInputDto[];

  @ApiPropertyOptional({ example: 'Sunset anniversary celebration' })
  @IsString()
  @IsOptional()
  specialRequests?: string;
}
