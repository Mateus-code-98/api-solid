import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';
import { AuthenticateUseCase } from './authenticate-use-case';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

const userExample = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  password: '123456',
};

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    userExample.password = await hash(userExample.password, 10);

    await usersRepository.create(userExample);

    userExample.password = '123456';

    const { user } = await sut.execute(userExample);

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    userExample.password = await hash(userExample.password, 10);

    await usersRepository.create(userExample);

    userExample.email = 'teu-77@gmail.com';

    expect(sut.execute(userExample)).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });

  it('should not be able to authenticate with wrong password', async () => {
    userExample.password = await hash(userExample.password, 10);

    await usersRepository.create(userExample);

    userExample.password = '1234567';

    expect(sut.execute(userExample)).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });
});
