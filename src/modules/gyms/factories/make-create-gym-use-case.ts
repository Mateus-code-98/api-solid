import { PrismaGymsRepository } from '@/modules/gyms/repository/prisma/prisma-gyms-repository';
import { CreateGymUseCase } from '@/modules/gyms/use-cases/create-gym/create-gym-use-case';

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
}
