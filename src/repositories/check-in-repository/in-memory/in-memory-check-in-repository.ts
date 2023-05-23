import { CheckIn } from '@/entities/CheckIn';
import { ICheckInRepository } from '../check-in-repository';
import { ICreateCheckInDTO } from '@/dtos/create-check-in-dto';

export class InMemoryCheckInRepository implements ICheckInRepository {
  private checkIns: CheckIn[] = [];

  async create(data: ICreateCheckInDTO): Promise<CheckIn> {
    const checkIn = new CheckIn(data);

    this.checkIns.push(checkIn);

    return checkIn;
  }
}
