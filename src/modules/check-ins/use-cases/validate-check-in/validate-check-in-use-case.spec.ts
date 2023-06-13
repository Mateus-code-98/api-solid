import { randomUUID } from 'crypto';
import { User } from '@prisma/client';
import { Gym } from '@/shared/entities/Gym';
import { ValidateCheckInUseCase } from './validate-check-in-use-case';
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { ICheckInRepository } from '../../repository/check-in-repository';
import { IGymsRepository } from '@/modules/gyms/repository/gyms-repository';
import { MILLISSECONDS_TO_VALIDATE_CHECK_IN } from '@/shared/utils/constants';
import { IUsersRepository } from '@/modules/users/repository/users-repository';
import { CheckInExpiredError } from '@/modules/check-ins/errors/check-in-expired-error';
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error';
import { InMemoryGymsRepository } from '@/modules/gyms/repository/in-memory/in-memory-gyms-repository';
import { InMemoryUsersRepository } from '@/modules/users/repository/in-memory/in-memory-users-repository';
import { InMemoryCheckInRepository } from '@/modules/check-ins/repository/in-memory/in-memory-check-in-repository';

let checkInRepository: ICheckInRepository;
let gymsRepository: IGymsRepository;
let usersRepository: IUsersRepository;
let useCase: ValidateCheckInUseCase;
let gym: Gym;
let user: User;

describe('GetUserProfile Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    gymsRepository = new InMemoryGymsRepository();
    usersRepository = new InMemoryUsersRepository();

    useCase = new ValidateCheckInUseCase(checkInRepository);

    gym = await gymsRepository.create({
      description: 'A JavaScript Gym',
      latitude: -27.0747279,
      longitude: -49.4889672,
      phone: '71999999999',
      title: 'JavaScript Gym',
    });

    user = await usersRepository.create({
      email: 'teu-99@gmail.com',
      name: 'Jon Doe',
      password: '123456',
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      user_id: user.id,
      gym_id: gym.id,
    });

    const { checkIn } = await useCase.execute({
      check_in_id: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });

  it('should not be able to validate an inexistent the check-in', async () => {
    await expect(
      useCase.execute({
        check_in_id: randomUUID(),
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate a check-in after x minutes of its creation', async () => {
    const actual_date = new Date('2021-01-01 12:00:00');

    vi.setSystemTime(actual_date);

    const createdCheckIn = await checkInRepository.create({
      gym_id: gym.id,
      user_id: user.id,
    });

    vi.advanceTimersByTime(MILLISSECONDS_TO_VALIDATE_CHECK_IN + 1);

    await expect(
      useCase.execute({
        check_in_id: createdCheckIn.id,
      })
    ).rejects.toBeInstanceOf(CheckInExpiredError);
  });
});
