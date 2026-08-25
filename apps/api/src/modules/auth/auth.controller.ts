import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { IApiResponse } from '@yacht-platform/types';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register new user account' })
  async signup(@Body() dto: SignupDto): Promise<IApiResponse> {
    const data = await this.authService.signup(dto);
    return {
      success: true,
      data,
      meta: { timestamp: new Date().toISOString(), correlationId: `auth-${Date.now()}` },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user credentials' })
  async login(@Body() dto: LoginDto): Promise<IApiResponse> {
    const data = await this.authService.login(dto);
    return {
      success: true,
      data,
      meta: { timestamp: new Date().toISOString(), correlationId: `auth-${Date.now()}` },
    };
  }
}
