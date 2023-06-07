import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms/fetch-nearby-gyms-use-case';
import { PrismaGymsRepository } from '@/repositories/gyms-repository/prisma/prisma-gyms-repository';

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
