import { Logger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  exports: [TypeOrmModule, UsersService, Logger],
  providers: [UsersService, JwtStrategy, Logger]
})
export class UsersModule {}
