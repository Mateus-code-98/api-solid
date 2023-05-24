import { IGymsRepository } from '@/repositories/gyms-repository/gyms-repository';

interface ICreateGymUseRequest {
  page: number;
  search: string;
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute(data: ICreateGymUseRequest) {
    const gyms = await this.gymsRepository.findManyByGenericSearch(data);

    return { gyms };
  }
}
