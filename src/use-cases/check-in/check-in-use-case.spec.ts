import { Gym } from '@/entities/Gym';
import { CheckInUseCase } from './check-in-use-case';
import { CheckInSameDayError } from '../errors/check-in-same-day-error';
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { IGymsRepository } from '@/repositories/gyms-repository/gyms-repository';
import { ICheckInRepository } from '@/repositories/check-in-repository/check-in-repository';
import { InMemoryGymsRepository } from '@/repositories/gyms-repository/in-memory/in-memory-gyms-repository';
import { DistanceIsGreaterThenMaxDistanceError } from '../errors/distance-is-greater-than-max-distance-error';
import { InMemoryCheckInRepository } from '@/repositories/check-in-repository/in-memory/in-memory-check-in-repository';

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
