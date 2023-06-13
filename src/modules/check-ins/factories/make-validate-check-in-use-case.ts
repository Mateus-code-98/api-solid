import { PrismaCheckInRepository } from '../repository/prisma/prisma-check-in-repository';
import { ValidateCheckInUseCase } from '../use-cases/validate-check-in/validate-check-in-use-case';

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInRepository();

  const useCase = new ValidateCheckInUseCase(checkInsRepository);

  return useCase;
}
