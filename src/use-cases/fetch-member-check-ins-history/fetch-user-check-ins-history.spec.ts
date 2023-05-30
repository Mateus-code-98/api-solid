import { Gym } from '@/entities/Gym';
import { expect, describe, it, beforeEach } from 'vitest';
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history';
import { ICheckInRepository } from '@/repositories/check-in-repository/check-in-repository';
import { InMemoryCheckInRepository } from '@/repositories/check-in-repository/in-memory/in-memory-check-in-repository';

let checkInRepository: ICheckInRepository;
let useCase: FetchUserCheckInsHistoryUseCase;

const user_id = '1';

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    useCase = new FetchUserCheckInsHistoryUseCase(checkInRepository);
  });

  it('should be able to fetch user check-in history', async () => {
    await checkInRepository.create({ gym_id: '1', user_id });
    await checkInRepository.create({ gym_id: '2', user_id });

    const { checkIns, count } = await useCase.execute({ user_id, page: 1 });

    expect(count).toEqual(2);
    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '1', user_id }),
      expect.objectContaining({ gym_id: '2', user_id }),
    ]);
  });

  it('should be able to fetch paginated user check-in history #1', async () => {
    for (let index = 0; index < 22; index += 1) {
      await checkInRepository.create({
        gym_id: (index + 1).toString(),
        user_id,
      });
    }

    const { checkIns, count } = await useCase.execute({ user_id, page: 2 });

    expect(count).toEqual(22);
    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ user_id }),
      expect.objectContaining({ user_id }),
    ]);
  });

  it('should be able to fetch paginated user check-in history #2', async () => {
    for (let index = 0; index < 22; index += 1) {
      await checkInRepository.create({
        gym_id: (index + 1).toString(),
        user_id,
      });
    }

    const { checkIns, count } = await useCase.execute({
      user_id,
      page: 1,
    });

    expect(count).toEqual(22);
    expect(checkIns).toHaveLength(20);
    expect(checkIns[0]).toEqual(expect.objectContaining({ user_id }));
    expect(checkIns[19]).toEqual(expect.objectContaining({ user_id }));
  });

  it('should be able to fetch paginated user check-in history #3', async () => {
    const auxCheckIn = {
      gym_id: '88',
      user_id: '2',
    };

    for (let index = 0; index < 22; index += 1) {
      await checkInRepository.create({
        gym_id: (index + 1).toString(),
        user_id,
      });
    }

    await checkInRepository.create(auxCheckIn);

    const { checkIns, count } = await useCase.execute({
      user_id: auxCheckIn.user_id,
      page: 1,
    });

    expect(count).toEqual(1);
    expect(checkIns).toHaveLength(1);
    expect(checkIns).toEqual([expect.objectContaining(auxCheckIn)]);
  });
});
