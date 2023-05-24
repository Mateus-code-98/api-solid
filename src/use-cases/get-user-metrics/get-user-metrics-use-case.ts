import { ICheckInRepository } from '@/repositories/check-in-repository/check-in-repository';

interface ICreateGymUseRequest {
  user_id: string;
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute(data: ICreateGymUseRequest) {
    const checkInsCount = await this.checkInRepository.countByUserId(data);

    return { checkInsCount };
  }
}
