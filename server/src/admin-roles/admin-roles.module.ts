import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AdminRolesController } from './admin-roles.controller';
import { AdminRolesService } from './admin-roles.service';

@Module({
  controllers: [AdminRolesController],
  providers: [AdminRolesService, PrismaService],
})
export class AdminRolesModule {}
