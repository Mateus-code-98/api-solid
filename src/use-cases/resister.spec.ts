import { compare } from 'bcryptjs';
import { RegisterUseCase } from './register';
import { expect, describe, it } from 'vitest';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';

const userExample = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  password: '123456',
};

describe('Register Use Case', () => {
  it('should be able to register a new user', async () => {
    const prismaUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    const { user } = await registerUseCase.execute(userExample);

    expect(user).toHaveProperty('id');
  });

  it('should hash user password upon registration', async () => {
    const prismaUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    const { user } = await registerUseCase.execute(userExample);

    const isPasswordCorrectlyHashed = await compare('123456', user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not allow two users with the same email', async () => {
    const prismaUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    await registerUseCase.execute(userExample);

    await expect(registerUseCase.execute(userExample)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
