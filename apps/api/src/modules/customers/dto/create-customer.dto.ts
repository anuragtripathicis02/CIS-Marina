import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Lord' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Sterling' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'sterling@luxury.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ example: '+971 50 999 8877' })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'United Kingdom' })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  vipStatus?: boolean;
}
