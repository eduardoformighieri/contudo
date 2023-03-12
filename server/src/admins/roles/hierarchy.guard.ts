import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtPayloadDto } from 'src/auth/dto/outputs/jwt-payload.dto';
import { AdminsService } from '../admins.service';

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

    const { user }: { user: JwtPayloadDto } = request;
    const { id } = request?.params;
    const affectedAdmin = await this.adminsService.findOne({ id });

    if (rolesHierarchy[user.role] <= rolesHierarchy[affectedAdmin.role]) {
      return false;
    }
    return true;
  }
}
