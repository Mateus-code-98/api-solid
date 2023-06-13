import { Gym } from '@/shared/entities/Gym';
import { ICreateGymDTO } from '../dtos/create-gym-dto';
import { ICountNearbyDTO } from '../dtos/count-nearby-dto';
import { IFindManyNearbyDTO } from '../dtos/find-many-nearby-dto';
import { IFindManyByGenericSearchDTO } from '../dtos/find-many-by-generic-search-dto';

export interface IGymsRepository {
  create(data: ICreateGymDTO): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  findManyByGenericSearch(data: IFindManyByGenericSearchDTO): Promise<Gym[]>;
  findManyNearby(data: IFindManyNearbyDTO): Promise<Gym[]>;
  countNearby(data: ICountNearbyDTO): Promise<number>;
}
