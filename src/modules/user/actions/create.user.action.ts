import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { AppService } from '../../../app.service';
import { UserRepository } from '../repositories/user.repository';

interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

@Injectable()
export class CreateUserAction {
  constructor(private readonly userRepository: UserRepository ) {}

  async execute({ email, password, name }: CreateUserRequest): Promise<User> {
    const user = new User({
      email,
      password,
      name,
    });
    this.userRepository.create(user);
    return user;
  }
}
