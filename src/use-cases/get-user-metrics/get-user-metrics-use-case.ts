import { ICheckInRepository } from '@/repositories/check-in-repository/check-in-repository';

interface IExecute {
  user_id: string;
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute(data: IExecute) {
    const checkInsCount = await this.checkInRepository.countByUserId(data);

    return { checkInsCount };
  }
}
