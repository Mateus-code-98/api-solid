import { IGymsRepository } from '@/modules/gyms/repository/gyms-repository';

interface IExecute {
  userLocation: {
    latitude: number;
    longitude: number;
  };
  page: number;
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({ page, userLocation }: IExecute) {
    const gyms = await this.gymsRepository.findManyNearby({
      page,
      userLocation,
    });

    const count = await this.gymsRepository.countNearby({ userLocation });

    return { gyms, count };
  }
}
