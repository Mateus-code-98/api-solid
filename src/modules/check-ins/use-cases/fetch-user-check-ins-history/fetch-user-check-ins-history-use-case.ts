import { ICheckInRepository } from '../../repository/check-in-repository';

interface IExecute {
  user_id: string;
  page: number;
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute(data: IExecute) {
    const checkIns = await this.checkInRepository.findManyByUserId(data);

    const count = await this.checkInRepository.countByUserId(data);

    return { checkIns, count };
  }
}
