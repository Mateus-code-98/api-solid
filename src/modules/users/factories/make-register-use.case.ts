import { RegisterUseCase } from '../use-cases/register/register-use-case';
import { PrismaUsersRepository } from '@/modules/users/repository/prisma/prisma-users-repository';

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
