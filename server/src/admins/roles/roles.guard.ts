import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';
import { AdminWithRoleDto } from '../dto/outputs/admin-with-role.dto';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const { user }: { user: { id: string } } = context
      .switchToHttp()
      .getRequest();

    const { role: userRole } = await this.prisma.admin.findFirst({
      where: { id: user.id },
      select: {
        role: true,
      },
    });

    return requiredRoles.some((role) => userRole?.name.includes(role));
  }
}
