import { Gym } from '@/entities/Gym';
import { prisma } from '@/lib/prisma';
import { IGymsRepository } from '../gyms-repository';
import { ICreateGymDTO } from '@/dtos/create-gym-dto';
import { ICountNearbyDTO } from '@/dtos/count-nearby-dto';
import { getTakeAndSkip } from '@/utils/get-take-and-skip';
import { IFindManyNearbyDTO } from '@/dtos/find-many-nearby-dto';
import { NEARBY_DISTANCE_IN_KILOMETERS } from '@/utils/constants';
import { IFindManyByGenericSearchDTO } from '@/dtos/find-many-by-generic-search-dto';

export class PrismaGymsRepository implements IGymsRepository {
  async create(data: ICreateGymDTO) {
    return prisma.gym.create({ data });
  }

  async findById(id: string) {
    return prisma.gym.findUnique({ where: { id } });
  }

  async findManyByGenericSearch({ page, search }: IFindManyByGenericSearchDTO) {
    const { skip, take } = getTakeAndSkip({ page });

    return prisma.gym.findMany({
      where: {
        OR: [
          { description: { contains: search } },
          { phone: { contains: search } },
          { title: { contains: search } },
        ],
      },
      skip,
      take,
    });
  }

  async findManyNearby(data: IFindManyNearbyDTO) {
    const { page, userLocation } = data;
    const { latitude, longitude } = userLocation;

    const { skip: offset, take: limit } = getTakeAndSkip({ page });

    return prisma.$queryRaw<Gym[]>`
      SELECT
          gyms.*,
          (
              6371 
              * acos(
                      cos(radians(${latitude})) 
                      * cos(radians(latitude)) 
                      * cos(radians(longitude) 
                      - radians(${longitude})) 
                      + sin(radians(${latitude})) 
                      * sin(radians(latitude))
                  )
          ) AS distance
      from
          gyms
      WHERE
        distance <= ${NEARBY_DISTANCE_IN_KILOMETERS}
      ORDER BY
        distance
      OFFSET
        ${offset}
      LIMIT
        ${limit}
    `;
  }

  async countNearby({ userLocation }: ICountNearbyDTO) {
    const { latitude, longitude } = userLocation;

    return prisma.$queryRaw<number>`
      SELECT
          COUNT(*)
      from
          gyms
      WHERE
        (
          6371 
          * acos(
                  cos(radians(${latitude})) 
                  * cos(radians(latitude)) 
                  * cos(radians(longitude) 
                  - radians(${longitude})) 
                  + sin(radians(${latitude})) 
                  * sin(radians(latitude))
              )
        ) <= ${NEARBY_DISTANCE_IN_KILOMETERS}
    `;
  }
}
