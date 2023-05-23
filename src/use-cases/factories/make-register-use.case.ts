import { RegisterUseCase } from '../register/register-use-case';
import { PrismaUsersRepository } from '@/repositories/users-repository/prisma/prisma-users-repository';

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
