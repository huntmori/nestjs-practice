import { AuthCredentialDto } from './dto/auth-credential.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const entity = this.create({ username, password });
    await this.save(entity);
  }
}
