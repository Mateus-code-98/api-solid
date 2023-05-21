import { Prisma, User } from '@prisma/client';

export interface IUserRepository {
  create(user: Prisma.UserCreateInput): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
}
