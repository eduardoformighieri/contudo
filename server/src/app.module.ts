import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), AdminsModule, AuthModule],
})
export class AppModule {}
