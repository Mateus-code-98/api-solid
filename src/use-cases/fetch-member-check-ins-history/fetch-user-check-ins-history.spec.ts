import { Gym } from '@/entities/Gym';
import { expect, describe, it, beforeEach } from 'vitest';
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history';
import { ICheckInRepository } from '@/repositories/check-in-repository/check-in-repository';
import { InMemoryCheckInRepository } from '@/repositories/check-in-repository/in-memory/in-memory-check-in-repository';

let checkInRepository: ICheckInRepository;
let useCase: FetchUserCheckInsHistoryUseCase;

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    useCase = new FetchUserCheckInsHistoryUseCase(checkInRepository);
  });

  it('should be able to fetch user check-in history', async () => {
    await checkInRepository.create({ gym_id: '1', user_id: '1' });
    await checkInRepository.create({ gym_id: '2', user_id: '1' });

    const { checkIns } = await useCase.execute({ user_id: '1', page: 1 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '1', user_id: '1' }),
      expect.objectContaining({ gym_id: '2', user_id: '1' }),
    ]);
  });

  it('should be able to fetch paginated user check-in history', async () => {
    for (let index = 0; index < 22; index += 1) {
      await checkInRepository.create({
        gym_id: (index + 1).toString(),
        user_id: '1',
      });
    }

    const { checkIns } = await useCase.execute({ user_id: '1', page: 2 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ user_id: '1' }),
      expect.objectContaining({ user_id: '1' }),
    ]);
  });
});
