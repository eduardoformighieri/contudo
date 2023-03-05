import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [ConfigModule.forRoot(), AdminsModule],
  providers: [PrismaService],
})
export class AppModule {}
