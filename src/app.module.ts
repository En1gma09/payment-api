import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'payment',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  }), UsersModule
  ],
  controllers: [],
  exports: [],
  providers: [],
})
export class AppModule { }
