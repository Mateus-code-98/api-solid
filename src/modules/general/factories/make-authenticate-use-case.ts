import { AuthenticateUseCase } from '../use-cases/authenticate/authenticate-use-case';
import { PrismaUsersRepository } from '@/modules/users/repository/prisma/prisma-users-repository';

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
