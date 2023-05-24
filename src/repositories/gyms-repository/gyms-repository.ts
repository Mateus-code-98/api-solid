import { Gym } from '@/entities/Gym';
import { ICreateGymDTO } from '@/dtos/create-gym-dto';
import { IFindManyByGenericSearchDTO } from '@/dtos/find-many-by-generic-search-dto';

export interface IGymsRepository {
  create(data: ICreateGymDTO): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  findManyByGenericSearch(data: IFindManyByGenericSearchDTO): Promise<Gym[]>;
}
