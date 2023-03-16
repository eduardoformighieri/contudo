import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AdminsService } from '../admins.service';
import { AdminWithRoleDto } from '../dto/outputs/admin-with-role.dto';

@Injectable()
export class HierarchyGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { user: affectingAdmin }: { user: { id: string } } = request;
    const { id: affectedAdminId } = request?.params;

    if (affectingAdmin.id === affectedAdminId) return false;

    const { role: affectingAdminRole } = await this.prisma.admin.findFirst({
      where: { id: affectingAdmin.id },
      select: {
        role: true,
      },
    });

    const { role: affectedAdminRole } = await this.prisma.admin.findFirst({
      where: { id: affectedAdminId },
      select: {
        role: true,
      },
    });

    if (affectingAdminRole.power_level <= affectedAdminRole.power_level)
      return false;

    return true;
  }
}
5;
