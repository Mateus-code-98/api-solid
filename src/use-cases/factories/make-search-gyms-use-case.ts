import { SearchGymsUseCase } from '../search-gyms/search-gyms-use-case';
import { PrismaGymsRepository } from '@/repositories/gyms-repository/prisma/prisma-gyms-repository';

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}
