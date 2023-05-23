import { ICheckInRepository } from '@/repositories/check-in-repository/check-in-repository';

interface ICheckInUseCaseRequest {
  user_id: string;
  gym_id: string;
}

export class CheckInUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute(data: ICheckInUseCaseRequest) {
    const checkIn = await this.checkInRepository.create(data);

    return { checkIn };
  }
}
