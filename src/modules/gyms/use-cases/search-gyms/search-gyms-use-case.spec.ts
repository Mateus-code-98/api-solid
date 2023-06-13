import { expect, describe, it, beforeEach } from 'vitest';
import { SearchGymsUseCase } from './search-gyms-use-case';
import { IGymsRepository } from '@/modules/gyms/repository/gyms-repository';
import { InMemoryGymsRepository } from '../../repository/in-memory/in-memory-gyms-repository';

const jsGym = {
  description: 'A JavaScript Gym',
  latitude: -27.0747279,
  longitude: -49.4889672,
  phone: '71999999999',
  title: 'JavaScript Gym',
};

const cssGym = {
  description: 'A CSS Gym',
  latitude: -27.0747279,
  longitude: -49.4889672,
  phone: '75999999999',
  title: 'CSS Gym',
};

const javaGym = {
  description: 'A Java Gym',
  latitude: -27.0747279,
  longitude: -49.4889672,
  phone: '75999999999',
  title: 'Java Gym',
};

let gymsRepository: IGymsRepository;
let useCase: SearchGymsUseCase;

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    useCase = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create(javaGym);
    await gymsRepository.create(cssGym);
    await gymsRepository.create(jsGym);

    const { gyms } = await useCase.execute({ search: 'gym', page: 1 });

    expect(gyms).toHaveLength(3);
  });

  it('should be able to fetch paginated user check-in history', async () => {
    for (let index = 0; index < 22; index += 1) {
      await gymsRepository.create({
        title: `Gym ${index + 1}`,
        description: 'A Gym',
        latitude: -27.0747279,
        longitude: -49.4889672,
        phone: '75999999999',
      });
    }

    const { gyms } = await useCase.execute({ search: 'gym', page: 2 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 21' }),
      expect.objectContaining({ title: 'Gym 22' }),
    ]);
  });
});
