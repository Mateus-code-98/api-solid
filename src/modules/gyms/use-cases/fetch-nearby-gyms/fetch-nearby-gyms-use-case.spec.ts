import { expect, describe, it, beforeEach } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms-use-case';
import { IGymsRepository } from '@/modules/gyms/repository/gyms-repository';
import { InMemoryGymsRepository } from '../../repository/in-memory/in-memory-gyms-repository';

const farGym = {
  description: 'A CSS Gym',
  latitude: -27.0610928,
  longitude: -49.5229501,
  phone: '75999999999',
  title: 'CSS Gym',
};

const nearbyGym_1 = {
  description: 'A PHP Gym',
  latitude: -27.2092052,
  longitude: -49.6401091,
  phone: '71999999999',
  title: 'PHP Gym',
};

const nearbyGym_2 = {
  description: 'A JavaScript Gym',
  latitude: -27.2093,
  longitude: -49.6401091,
  phone: '71999999999',
  title: 'JavaScript Gym',
};

const userLocation = {
  latitude: -27.2092052,
  longitude: -49.6401091,
};

let gymsRepository: IGymsRepository;
let useCase: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    useCase = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    for (let i = 0; i < 20; i++) await gymsRepository.create(nearbyGym_2);

    await gymsRepository.create(farGym);
    await gymsRepository.create(nearbyGym_1);

    const { gyms, count } = await useCase.execute({ page: 1, userLocation });

    expect(count).toEqual(21);
    expect(gyms.length).toEqual(20);
    expect(gyms[0]).toEqual(expect.objectContaining(nearbyGym_1));
    expect(gyms[19]).toEqual(expect.objectContaining(nearbyGym_2));
  });

  it('should be able to fetch paginated nearby gyms #1', async () => {
    for (let i = 0; i < 20; i++) await gymsRepository.create(nearbyGym_2);

    await gymsRepository.create(farGym);
    await gymsRepository.create(nearbyGym_1);

    const { gyms, count } = await useCase.execute({ page: 2, userLocation });

    expect(count).toEqual(21);
    expect(gyms.length).toEqual(1);
    expect(gyms[0]).toEqual(expect.objectContaining(nearbyGym_2));
  });

  it('should be able to fetch paginated nearby gyms #2', async () => {
    for (let i = 0; i < 20; i++) await gymsRepository.create(nearbyGym_2);

    await gymsRepository.create(farGym);
    await gymsRepository.create(nearbyGym_1);

    const { gyms, count } = await useCase.execute({ page: 1, userLocation });

    expect(count).toEqual(21);
    expect(gyms.length).toEqual(20);
    expect(gyms[0]).toEqual(expect.objectContaining(nearbyGym_1));
  });

  it('should be able to fetch paginated nearby gyms #3', async () => {
    const auxUserLocation = {
      latitude: -27.0610928,
      longitude: -49.5229501,
    };
    for (let i = 0; i < 20; i++) await gymsRepository.create(nearbyGym_2);

    await gymsRepository.create(farGym);
    await gymsRepository.create(nearbyGym_1);

    const { gyms, count } = await useCase.execute({
      page: 1,
      userLocation: auxUserLocation,
    });

    expect(count).toEqual(1);
    expect(gyms.length).toEqual(1);
    expect(gyms[0]).toEqual(expect.objectContaining(farGym));
  });
});
