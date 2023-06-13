import { IGymsRepository } from '@/modules/gyms/repository/gyms-repository';

interface IExecute {
  description: string;
  latitude: number;
  longitude: number;
  phone: string;
  title: string;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute(data: IExecute) {
    const gym = await this.gymsRepository.create(data);

    return { gym };
  }
}
