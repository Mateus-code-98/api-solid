import { Gym } from '@/entities/Gym';
import { IGymsRepository } from '../gyms-repository';
import { ICreateGymDTO } from '@/dtos/create-gym-dto';
import { IFindManyByGenericSearchDTO } from '@/dtos/find-many-by-generic-search-dto';
import { ITENS_PER_PAGE } from '@/utils/constants';

export class InMemoryGymsRepository implements IGymsRepository {
  private gyms: Gym[] = [];

  async create(data: ICreateGymDTO) {
    const gymInstance = new Gym(data);

    this.gyms.push(gymInstance);

    return gymInstance;
  }

  async findById(id: string) {
    return this.gyms.find((gym) => gym.id === id) ?? null;
  }

  async findManyByGenericSearch(data: IFindManyByGenericSearchDTO) {
    const { search, page } = data;
    const start = (page - 1) * ITENS_PER_PAGE;

    const attrToCompare = ['title', 'description', 'phone'] as Array<keyof Gym>;

    const gyms = this.gyms.filter((gym, index) => {
      const gymMatched = attrToCompare.find((field) => {
        const valueOfAttr = gym[field].toString().toLowerCase();
        return valueOfAttr.includes(search.toLowerCase());
      });

      return gymMatched && index >= start;
    });

    return gyms;
  }
}
