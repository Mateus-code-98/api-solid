import { Gym } from '@/entities/Gym';
import { IGymsRepository } from '../gyms-repository';
import { ICreateGymDTO } from '@/dtos/create-gym-dto';

export class InMemoryGymsRepository implements IGymsRepository {
  private gyms: Gym[] = [];

  async findById(id: string) {
    return this.gyms.find((gym) => gym.id === id) ?? null;
  }

  async create(gym: ICreateGymDTO) {
    const gymInstance = new Gym(gym);

    this.gyms.push(gymInstance);

    return gymInstance;
  }
}
