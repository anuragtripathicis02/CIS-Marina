import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Currency } from '@yacht-platform/types';

export class CreatePaymentIntentDto {
  @ApiProperty({ example: 'booking-uuid-1234' })
  @IsString()
  @IsNotEmpty()
  bookingId: string;

  @ApiProperty({ example: 3500.00 })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiPropertyOptional({ enum: Currency, example: Currency.USD })
  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;
}
