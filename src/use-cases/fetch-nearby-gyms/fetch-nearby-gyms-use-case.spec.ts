import { expect, describe, it, beforeEach } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms-use-case';
import { IGymsRepository } from '@/repositories/gyms-repository/gyms-repository';
import { InMemoryGymsRepository } from '@/repositories/gyms-repository/in-memory/in-memory-gyms-repository';

const jsGym = {
  description: 'A JavaScript Gym',
  latitude: -27.2093,
  longitude: -49.6401091,
  phone: '71999999999',
  title: 'JavaScript Gym',
};

const cssGym = {
  description: 'A CSS Gym',
  latitude: -27.0610928,
  longitude: -49.5229501,
  phone: '75999999999',
  title: 'CSS Gym',
};

const phpGym = {
  description: 'A PHP Gym',
  latitude: -27.2092052,
  longitude: -49.6401091,
  phone: '71999999999',
  title: 'PHP Gym',
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
    for (let i = 0; i < 20; i++) await gymsRepository.create(jsGym);

    await gymsRepository.create(cssGym);
    await gymsRepository.create(phpGym);

    const { gyms, count } = await useCase.execute({ page: 1, userLocation });

    expect(count).toEqual(21);
    expect(gyms.length).toEqual(20);
    expect(gyms[0]).toEqual(expect.objectContaining(phpGym));
    expect(gyms[19]).toEqual(expect.objectContaining(jsGym));
  });
});
