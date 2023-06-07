import { PrismaCheckInRepository } from '@/repositories/check-in-repository/prisma/prisma-check-in-repository';
import { GetUserMetricsUseCase } from '../get-user-metrics/get-user-metrics-use-case';

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInRepository();

  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}
