import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AdminsService } from '../admins.service';
import { AdminWithRoleDto } from '../dto/outputs/admin-with-role.dto';

const rolesHierarchy = {
  Leader: 4,
  'Co-leader': 3,
  Elder: 2,
  Member: 1,
};

@Injectable()
export class HierarchyGuard implements CanActivate {
  constructor(private adminsService: AdminsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { user }: { user: AdminWithRoleDto } = request;
    const { id } = request?.params;
    const affectedAdmin = await this.adminsService.findOne({ id });

    if (rolesHierarchy[user.role] <= rolesHierarchy[affectedAdmin.role]) {
      return false;
    }
    return true;
  }
}
