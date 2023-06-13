import { hashSync } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';
import { GetUserProfileUseCase } from './get-user-profile-use-case';
import { ResourceNotFoundError } from '../../../../shared/errors/resource-not-found-error';
import { IUsersRepository } from '@/modules/users/repository/users-repository';
import { InMemoryUsersRepository } from '@/modules/users/repository/in-memory/in-memory-users-repository';

const userExample = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  password: '123456',
};

let usersRepository: IUsersRepository;
let useCase: GetUserProfileUseCase;

describe('GetUserProfile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    useCase = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    userExample.password = hashSync(userExample.password, 10);

    const { id: user_id, name } = await usersRepository.create(userExample);

    const { user } = await useCase.execute({ user_id });

    expect(user.id).toEqual(user_id);
    expect(user.name).toEqual(name);
  });

  it('should not be able to get user profile with invalid id', async () => {
    userExample.password = hashSync(userExample.password, 10);

    const { id: user_id } = await usersRepository.create(userExample);

    expect(useCase.execute({ user_id: user_id + '1' })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
