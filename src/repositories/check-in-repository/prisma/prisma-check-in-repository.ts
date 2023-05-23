import { prisma } from '@/lib/prisma';
import { CheckIn } from '@/entities/CheckIn';
import { ICheckInRepository } from '../check-in-repository';
import { ICreateCheckInDTO } from '@/dtos/create-check-in-dto';

export class PrismaCheckInRepository implements ICheckInRepository {
  async create(data: ICreateCheckInDTO): Promise<CheckIn> {
    return prisma.checkIn.create({
      data,
    });
  }
}
