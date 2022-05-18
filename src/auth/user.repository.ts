import { AuthCredentialDto } from './dto/auth-credential.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const entity = this.create({
      username: username,
      password: hashedPassword,
    });

    try {
      await this.save(entity);
    } catch (error) {
      console.log(error);
      if (error.code === '24505') {
        throw new ConflictException('username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
