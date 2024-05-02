import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), UsersModule, JwtModule.register({
    secret: 'humanotechtrilhanodejs',
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [AuthController],
  exports: [TypeOrmModule, JwtStrategy, Logger],
  providers: [AuthService, JwtStrategy, Logger]
})
export class AuthModule { }
