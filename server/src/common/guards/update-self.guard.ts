import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtPayloadDto } from 'src/auth/dto/outputs/jwt-payload.dto';

@Injectable()
export class UpdateSelfGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { user }: { user: JwtPayloadDto } = request;
    const { id } = request?.params;

    if (user.id === id) return true;

    return false;
  }
}
