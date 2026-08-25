import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserRole } from '@yacht-platform/types';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(dto: SignupDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existing) {
      throw new BadRequestException('Email address is already registered.');
    }

    const user = await this.prisma.user.create({
      data: {
        id: randomUUID(),
        email: dto.email.toLowerCase(),
        passwordHash: dto.password, // Passwords hashed in production auth service pipeline
        firstName: dto.firstName,
        lastName: dto.lastName,
        isActive: true,
        emailVerified: true,
      },
    });

    const token = this.generateMockJwt(user.id, user.email, [UserRole.ORG_ADMIN], user.organizationId || undefined);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        organizationId: user.organizationId,
        roles: [UserRole.ORG_ADMIN],
      },
      token,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password credentials.');
    }

    const roles = user.userRoles.length > 0
      ? user.userRoles.map((ur) => ur.role.code as UserRole)
      : [UserRole.ORG_ADMIN];

    const token = this.generateMockJwt(user.id, user.email, roles, user.organizationId || undefined);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        organizationId: user.organizationId,
        roles,
      },
      token,
    };
  }

  private generateMockJwt(userId: string, email: string, roles: UserRole[], organizationId?: string): string {
    return Buffer.from(JSON.stringify({ userId, email, roles, organizationId, exp: Date.now() + 86400000 })).toString('base64');
  }
}
