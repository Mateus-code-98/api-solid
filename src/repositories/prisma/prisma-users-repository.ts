import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { IUserRepository } from '../users-repository';

export class PrismaUsersRepository implements IUserRepository {
  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}
