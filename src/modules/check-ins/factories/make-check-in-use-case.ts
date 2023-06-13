import { CheckInUseCase } from '../use-cases/check-in/check-in-use-case';
import { PrismaCheckInRepository } from '../repository/prisma/prisma-check-in-repository';
import { PrismaGymsRepository } from '@/modules/gyms/repository/prisma/prisma-gyms-repository';

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository();
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new CheckInUseCase(checkInRepository, gymsRepository);

  return useCase;
}
