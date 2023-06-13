import { compareSync } from 'bcryptjs';
import { RegisterUseCase } from './register-use-case';
import { expect, describe, it, beforeEach } from 'vitest';
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error';
import { IUsersRepository } from '@/modules/users/repository/users-repository';
import { InMemoryUsersRepository } from '@/modules/users/repository/in-memory/in-memory-users-repository';

const userExample = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  password: '123456',
};

let usersRepository: IUsersRepository;
let useCase: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    useCase = new RegisterUseCase(usersRepository);
  });

  it('should be able to register a new user', async () => {
    const { user } = await useCase.execute(userExample);

    expect(user).toHaveProperty('id');
  });

  it('should hash user password upon registration', async () => {
    const { user } = await useCase.execute(userExample);

    const isPasswordCorrectlyHashed = compareSync(
      userExample.password,
      user.password
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not allow two users with the same email', async () => {
    await useCase.execute(userExample);

    await expect(useCase.execute(userExample)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
