import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(UsersService.name);
  }

  async create(createUserDto: CreateUserDto) {
    const user: User = {
      id: 0,
      name: 'Filippo',
      username: 'filippo',
      password: 'filippo123',
      deleted: false,
    }
    const result = await this.repository.save(user);

    return result;
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findByUsername(username: string) {
    this.logger.log(`Buscando usuário no repositório por username: ${username}`);
    return await this.repository.findOne({ where: { username: username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
