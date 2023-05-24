import { IGymsRepository } from '@/repositories/gyms-repository/gyms-repository';

interface ICreateGymUseRequest {
  description: string;
  latitude: number;
  longitude: number;
  phone: string;
  title: string;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute(data: ICreateGymUseRequest) {
    const gym = await this.gymsRepository.create(data);

    return { gym };
  }
}
