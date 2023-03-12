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
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/inputs/login.dto';
import { UpdatePasswordDto } from './dto/inputs/update-password.dto';
import { JwtPayloadDto } from './dto/outputs/jwt-payload.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtPayload } from './interfaces/jwt-payload.interface';

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
    @Request() req: { user: JwtPayloadDto },
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    this.authService.updatePassword({
      where: { id: req.user.id },
      data: updatePasswordDto,
    });
    return { message: 'Password changed successfully' };
  }
}
