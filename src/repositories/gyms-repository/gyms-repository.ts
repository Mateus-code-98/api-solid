import { ICreateGymDTO } from '@/dtos/create-gym-dto';
import { Gym } from '@/entities/Gym';

export interface IGymsRepository {
  create(data: ICreateGymDTO): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
}
