import { Module } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  controllers: [AdminsController],
  imports: [
    JwtModule.register({
      secret: process.env.FIRST_ACCESS_JWT_SECRET,
    }),
  ],
  providers: [AdminsService, PrismaService, EmailService, JwtStrategy],
})
export class AdminsModule {}
