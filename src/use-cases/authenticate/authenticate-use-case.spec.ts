import { hashSync } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';
import { AuthenticateUseCase } from './authenticate-use-case';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { IUsersRepository } from '@/repositories/users-repository/users-repository';
import { InMemoryUsersRepository } from '@/repositories/users-repository/in-memory/in-memory-users-repository';

const userExample = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  password: '123456',
};

let usersRepository: IUsersRepository;
let useCase: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    useCase = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    userExample.password = hashSync(userExample.password, 10);

    await usersRepository.create(userExample);

    userExample.password = '123456';

    const { user } = await useCase.execute(userExample);

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    userExample.password = hashSync(userExample.password, 10);

    await usersRepository.create(userExample);

    userExample.password = '123456';
    userExample.email = 'teu-77@gmail.com';

    expect(useCase.execute(userExample)).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });

  it('should not be able to authenticate with wrong password', async () => {
    userExample.password = hashSync(userExample.password, 10);

    await usersRepository.create(userExample);

    userExample.password = '1234567';

    expect(useCase.execute(userExample)).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });
});
