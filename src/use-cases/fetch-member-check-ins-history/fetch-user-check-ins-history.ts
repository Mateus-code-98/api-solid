import { ICheckInRepository } from '@/repositories/check-in-repository/check-in-repository';

interface ICreateGymUseRequest {
  user_id: string;
  page: number;
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute(data: ICreateGymUseRequest) {
    const checkIns = await this.checkInRepository.findManyByUserId(data);

    return { checkIns };
  }
}
