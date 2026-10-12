import { compare } from 'bcrypt';
import { User } from '../entities/user';
import { UserRepositoryMock } from '../repositories/user.repository.mock';
import { CreateUserAction } from './create.user.action';

let userRepository = new UserRepositoryMock();
let createUserAction = new CreateUserAction(userRepository);

describe('Create user', () => {
  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    createUserAction = new CreateUserAction(userRepository);
  });

  it('Should create user', async () => {
    expect(userRepository.users).toEqual([]);

    const newUser = await createUserAction.execute({
      email: 'email@email.com',
      password: '123123',
      name: 'User Name',
    });

    expect(userRepository.users).toEqual([newUser]);
  });

  it('Should create user with encrypted password', async () => {
    const decryptedPassword = '123123';

    const newUser = await createUserAction.execute({
      email: 'email@email.com',
      password: decryptedPassword,
      name: 'User Name',
    });

    const passwordsMatch = await compare(decryptedPassword, newUser.password);

    expect(passwordsMatch).toBeTruthy();
  });
});
