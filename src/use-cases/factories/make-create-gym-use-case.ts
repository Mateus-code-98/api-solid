import { CreateGymUseCase } from '../create-gym/create-gym-use-case';
import { PrismaGymsRepository } from '@/repositories/gyms-repository/prisma/prisma-gyms-repository';

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
}
