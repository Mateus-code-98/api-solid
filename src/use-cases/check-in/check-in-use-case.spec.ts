import { CheckInUseCase } from './check-in-use-case';
import { expect, describe, it, beforeEach } from 'vitest';
import { ICheckInRepository } from '@/repositories/check-in-repository/check-in-repository';
import { InMemoryCheckInRepository } from '@/repositories/check-in-repository/in-memory/in-memory-check-in-repository';

let checkInRepository: ICheckInRepository;
let useCase: CheckInUseCase;

describe('GetUserProfile Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository();
    useCase = new CheckInUseCase(checkInRepository);
  });

  it('should be able to create a check-in', async () => {
    const { checkIn } = await useCase.execute({
      user_id: '1',
      gym_id: '1',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
