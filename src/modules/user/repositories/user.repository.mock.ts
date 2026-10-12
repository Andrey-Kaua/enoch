import { User } from '../entities/user';
import { UserRepository } from './user.repository';

export class UserRepositoryMock implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
