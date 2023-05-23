import { GetUserProfileUseCase } from '../get-user-profile/get-user-profile-use-case';
import { PrismaUsersRepository } from '@/repositories/users-repository/prisma/prisma-users-repository';

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);

  return getUserProfileUseCase;
}
