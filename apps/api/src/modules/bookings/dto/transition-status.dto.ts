import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookingStatus } from '@yacht-platform/types';

export class TransitionStatusDto {
  @ApiProperty({ enum: BookingStatus, example: BookingStatus.CONFIRMED })
  @IsEnum(BookingStatus)
  @IsNotEmpty()
  status: BookingStatus;

  @ApiPropertyOptional({ example: 'Deposit payment captured via Stripe.' })
  @IsString()
  @IsOptional()
  notes?: string;
}
