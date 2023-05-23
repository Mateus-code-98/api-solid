import { AuthenticateUseCase } from '../authenticate/authenticate-use-case';
import { PrismaUsersRepository } from '@/repositories/users-repository/prisma/prisma-users-repository';

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
