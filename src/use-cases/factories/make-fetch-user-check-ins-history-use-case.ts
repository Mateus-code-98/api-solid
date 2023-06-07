import { PrismaCheckInRepository } from '@/repositories/check-in-repository/prisma/prisma-check-in-repository';
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history/fetch-user-check-ins-history-use-case';

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInRepository();

  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
