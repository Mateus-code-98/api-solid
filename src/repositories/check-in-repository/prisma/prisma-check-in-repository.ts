import { prisma } from '@/lib/prisma';
import { CheckIn } from '@/entities/CheckIn';
import { ICheckInRepository } from '../check-in-repository';
import { ICreateCheckInDTO } from '@/dtos/create-check-in-dto';
import { IFindManyByUserIdDTO } from '@/dtos/find-many-by-user-id-dto';
import { IFindCheckInByUserIdAndDateDTO } from '@/dtos/find-check-in-by-user-id-and-date';

export class PrismaCheckInRepository implements ICheckInRepository {
  async create(data: ICreateCheckInDTO): Promise<CheckIn> {
    return prisma.checkIn.create({
      data,
    });
  }

  async findByUserIdAndDate(data: IFindCheckInByUserIdAndDateDTO) {
    const { user_id, created_at } = data;

    return prisma.checkIn.findFirst({
      where: { user_id, created_at },
    });
  }

  async findManyByUserId({ user_id }: IFindManyByUserIdDTO) {
    return prisma.checkIn.findMany({
      where: { user_id },
    });
  }

  async countByUserId({ user_id }: IFindManyByUserIdDTO) {
    return prisma.checkIn.count({
      where: { user_id },
    });
  }

  async findById({ id }: { id: string }) {
    return prisma.checkIn.findFirst({
      where: { id },
    });
  }

  async update(data: CheckIn) {
    return prisma.checkIn.update({
      where: { id: data.id },
      data,
    });
  }
}
