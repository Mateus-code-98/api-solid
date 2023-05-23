import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';
import { GetUserProfileUseCase } from './get-user-profile-use-case';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

const userExample = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  password: '123456',
};

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('GetUserProfile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    userExample.password = await hash(userExample.password, 10);

    const { id: userId } = await usersRepository.create(userExample);

    const { user } = await sut.execute({ userId });

    expect(user.id).toEqual(userId);
    expect(user.name).toEqual(userExample.name);
  });

  it('should not be able to get user profile with invalid id', async () => {
    userExample.password = await hash(userExample.password, 10);

    const { id: userId } = await usersRepository.create(userExample);

    expect(sut.execute({ userId: userId + '1' })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
