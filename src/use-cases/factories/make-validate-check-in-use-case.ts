import { ValidateCheckInUseCase } from '../validate-check-in/validate-check-in-use-case';
import { PrismaCheckInRepository } from '@/repositories/check-in-repository/prisma/prisma-check-in-repository';

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInRepository();

  const useCase = new ValidateCheckInUseCase(checkInsRepository);

  return useCase;
}
