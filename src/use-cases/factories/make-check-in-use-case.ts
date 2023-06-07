import { CheckInUseCase } from '../check-in/check-in-use-case';
import { PrismaGymsRepository } from '@/repositories/gyms-repository/prisma/prisma-gyms-repository';
import { PrismaCheckInRepository } from '@/repositories/check-in-repository/prisma/prisma-check-in-repository';

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository();
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new CheckInUseCase(checkInRepository, gymsRepository);

  return useCase;
}
