import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { ValidateAdminDto } from '../dto/validate-admin.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(validateAdminDto: ValidateAdminDto): Promise<any> {
    const admin = await this.authService.validateAdmin(validateAdminDto);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
