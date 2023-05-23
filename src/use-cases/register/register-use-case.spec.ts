import { compare } from 'bcryptjs';
import { RegisterUseCase } from './register-use-case';
import { expect, describe, it, beforeEach } from 'vitest';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

const userExample = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  password: '123456',
};

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('should be able to register a new user', async () => {
    const { user } = await sut.execute(userExample);

    expect(user).toHaveProperty('id');
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute(userExample);

    const isPasswordCorrectlyHashed = await compare('123456', user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not allow two users with the same email', async () => {
    await sut.execute(userExample);

    await expect(sut.execute(userExample)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
