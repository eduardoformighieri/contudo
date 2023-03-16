import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AdminWithRoleDto } from 'src/admins/dto/outputs/admin-with-role.dto';

@Injectable()
export class UpdateSelfGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { user }: { user: { id: string } } = request;
    const { id } = request?.params;

    if (user.id === id) return true;

    return false;
  }
}
