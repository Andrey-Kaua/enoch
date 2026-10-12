import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user.repository';
import { hash } from 'bcrypt';

interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

@Injectable()
export class CreateUserAction {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email, password, name }: CreateUserRequest): Promise<User> {
    const user = new User({
      email,
      password: await hash(password, 10),
      name,
    });
    await this.userRepository.create(user);
    return user;
  }
}
