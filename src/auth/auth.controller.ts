import { Controller, Get, Post, Body, Patch, Param, Delete, Scope, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller({ path: 'auth', scope: Scope.REQUEST })
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly logger: Logger
  ) {
    this.logger = new Logger(AuthController.name);
  }

  @Post()
  async login(@Body() loginDto: LoginDto) {
    this.logger.log(`Buscando usuário por username: ${loginDto?.username}`);
    const user = await this.userService.findByUsername(loginDto.username);
    if (user && user.password === loginDto.password) {
      this.logger.log(`Usuário encontrado e password validada: ${loginDto?.username}`);
      const payload = {
        username: user.username,
        sub: user.username
      };
      return { acessToken: await this.jwtService.signAsync(payload) };
    }
    this.logger.warn(`Erro ao buscar usuário. Login ou senha incorretos: ${loginDto.username}`);
    this.logger.error(`Erro ao buscar usuário. Login ou senha incorretos: ${loginDto.username}`);
    return null;
  }
}
