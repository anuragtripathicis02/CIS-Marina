import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Public / unauthenticated routes don't enforce tenant guard
    if (!user) {
      return true;
    }

    const tenantId = user.organizationId;
    if (!tenantId && user.role !== 'SUPER_ADMIN') {
      throw new ForbiddenException('User is not associated with an active organization context.');
    }

    if (tenantId) {
      // Set RLS session variable for database queries
      await this.prisma.setTenantContext(tenantId);
    }

    return true;
  }
}
