import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/inputs/login.dto';
import * as bcrypt from 'bcryptjs';
import { AdminWithRoleDto } from 'src/admins/dto/outputs/admin-with-role.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return new AdminWithRoleDto(admin);
    }
    throw new UnauthorizedException();
  }
}
