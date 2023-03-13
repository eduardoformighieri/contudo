import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminWithRoleDto } from 'src/admins/dto/outputs/admin-with-role.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/inputs/login.dto';
import { UpdatePasswordDto } from './dto/inputs/update-password.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Admins Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login Admin' })
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get information about the logged Admin' })
  getProfile(@Request() req) {
    return req.user;
  }

  @Patch('updatePassword')
  @ApiOperation({ summary: 'Update password' })
  async updatePassword(
    @Request() req: { user: AdminWithRoleDto },
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    this.authService.updatePassword({
      where: { id: req.user.id },
      data: updatePasswordDto,
    });
    return { message: 'Password changed successfully' };
  }
}
