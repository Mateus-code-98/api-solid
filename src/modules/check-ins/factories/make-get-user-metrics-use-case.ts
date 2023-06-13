import { PrismaCheckInRepository } from '../repository/prisma/prisma-check-in-repository';
import { GetUserMetricsUseCase } from '../use-cases/get-user-metrics/get-user-metrics-use-case';

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInRepository();

  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}
