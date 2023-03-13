import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AdminsService } from '../admins.service';
import { AdminWithRoleDto } from '../dto/outputs/admin-with-role.dto';

@Injectable()
export class HierarchyGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { user }: { user: AdminWithRoleDto } = request;
    const { id } = request?.params;
    const { power_level: affectingAdminPowerLevel } =
      await this.prisma.adminRole.findFirst({
        where: { name: user.role },
      });
    const affectedAdmin = await this.prisma.admin.findFirst({ where: { id } });
    const { power_level: affectedAdminPowerLevel } =
      await this.prisma.adminRole.findFirst({
        where: { id: affectedAdmin.role_id },
      });

    if (affectingAdminPowerLevel <= affectedAdminPowerLevel) {
      return false;
    }
    return true;
  }
}
5;
