import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
