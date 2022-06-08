import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  imports: [JwtStrategy],
})
export class AuthModule {}
