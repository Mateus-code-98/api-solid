import { PrismaGymsRepository } from '../repository/prisma/prisma-gyms-repository';
import { FetchNearbyGymsUseCase } from '../use-cases/fetch-nearby-gyms/fetch-nearby-gyms-use-case';

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
