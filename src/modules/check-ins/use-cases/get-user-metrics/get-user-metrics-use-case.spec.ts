import { describe, it, beforeEach, expect } from 'vitest';
import { GetUserMetricsUseCase } from './get-user-metrics-use-case';
import { ICheckInRepository } from '../../repository/check-in-repository';
import { InMemoryCheckInRepository } from '@/modules/check-ins/repository/in-memory/in-memory-check-in-repository';

let checkInRepository: ICheckInRepository;
let useCase: GetUserMetricsUseCase;

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    useCase = new GetUserMetricsUseCase(checkInRepository);
  });

  it('should be able to get check-in count from metrics', async () => {
    await checkInRepository.create({ gym_id: '1', user_id: '1' });
    await checkInRepository.create({ gym_id: '2', user_id: '1' });

    const { checkInsCount } = await useCase.execute({ user_id: '1' });

    expect(checkInsCount).toBe(2);
  });
});
