import { PrismaCheckInRepository } from '../repository/prisma/prisma-check-in-repository';
import { FetchUserCheckInsHistoryUseCase } from '../use-cases/fetch-user-check-ins-history/fetch-user-check-ins-history-use-case';

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInRepository();

  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
