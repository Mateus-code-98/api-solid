import { IGymsRepository } from '@/repositories/gyms-repository/gyms-repository';

interface IExecute {
  page: number;
  search: string;
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute(data: IExecute) {
    const gyms = await this.gymsRepository.findManyByGenericSearch(data);

    return { gyms };
  }
}
