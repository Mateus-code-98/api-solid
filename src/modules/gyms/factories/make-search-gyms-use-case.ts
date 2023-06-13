import { SearchGymsUseCase } from '../use-cases/search-gyms/search-gyms-use-case';
import { PrismaGymsRepository } from '../repository/prisma/prisma-gyms-repository';

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}
