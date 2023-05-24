import { CreateGymUseCase } from './create-gym-use-case';
import { expect, describe, it, beforeEach } from 'vitest';
import { IGymsRepository } from '@/repositories/gyms-repository/gyms-repository';
import { InMemoryGymsRepository } from '@/repositories/gyms-repository/in-memory/in-memory-gyms-repository';

const gymExample = {
  description: 'A JavaScript Gym',
  latitude: -27.0747279,
  longitude: -49.4889672,
  phone: '71999999999',
  title: 'JavaScript Gym',
};

let gymsRepository: IGymsRepository;
let useCase: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    useCase = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to create a gym', async () => {
    const { gym } = await useCase.execute(gymExample);

    expect(gym).toHaveProperty('id');
  });
});
