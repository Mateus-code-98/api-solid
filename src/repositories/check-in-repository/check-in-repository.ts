import { CheckIn } from '@/entities/CheckIn';
import { ICreateCheckInDTO } from '@/dtos/create-check-in-dto';

export interface ICheckInRepository {
  create(data: ICreateCheckInDTO): Promise<CheckIn>;
}
