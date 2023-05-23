import { prisma } from '@/lib/prisma';
import { IUsersRepository } from '../users-repository';
import { ICreateUserDTO } from '@/dtos/create-user-dto';

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: ICreateUserDTO) {
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
