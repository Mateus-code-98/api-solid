import { Gym } from '@/shared/entities/Gym';
import { CheckInUseCase } from './check-in-use-case';
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { ICheckInRepository } from '../../repository/check-in-repository';
import { CheckInSameDayError } from '../../errors/check-in-same-day-error';
import { IGymsRepository } from '@/modules/gyms/repository/gyms-repository';
import { InMemoryGymsRepository } from '@/modules/gyms/repository/in-memory/in-memory-gyms-repository';
import { InMemoryCheckInRepository } from '@/modules/check-ins/repository/in-memory/in-memory-check-in-repository';
import { DistanceIsGreaterThenMaxDistanceError } from '../../errors/distance-is-greater-than-max-distance-error';

let checkInRepository: ICheckInRepository;
let gymsRepository: IGymsRepository;
let useCase: CheckInUseCase;
let gym: Gym;

describe('GetUserProfile Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    gymsRepository = new InMemoryGymsRepository();
    useCase = new CheckInUseCase(checkInRepository, gymsRepository);

    gym = await gymsRepository.create({
      description: 'A JavaScript Gym',
      latitude: -27.0747279,
      longitude: -49.4889672,
      phone: '71999999999',
      title: 'JavaScript Gym',
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to create a check-in', async () => {
    const { checkIn } = await useCase.execute({
      user_id: '1',
      gym_id: gym.id,
      userLatitude: gym.latitude,
      userLongitude: gym.longitude,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await useCase.execute({
      user_id: '1',
      gym_id: gym.id,
      userLatitude: gym.latitude,
      userLongitude: gym.longitude,
    });

    await expect(
      useCase.execute({
        user_id: '1',
        gym_id: gym.id,
        userLatitude: gym.latitude,
        userLongitude: gym.longitude,
      })
    ).rejects.toBeInstanceOf(CheckInSameDayError);
  });

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await useCase.execute({
      user_id: '1',
      gym_id: gym.id,
      userLatitude: gym.latitude,
      userLongitude: gym.longitude,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    await expect(
      useCase.execute({
        user_id: '1',
        gym_id: gym.id,
        userLatitude: gym.latitude,
        userLongitude: gym.longitude,
      })
    ).resolves.toBeTruthy();
  });

  it('should not be able to check in on distance greater than max distance', async () => {
    await expect(
      useCase.execute({
        user_id: '1',
        gym_id: gym.id,
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(DistanceIsGreaterThenMaxDistanceError);
  });
});
