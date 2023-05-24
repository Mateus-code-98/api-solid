import { CheckIn } from '@/entities/CheckIn';
import { ICreateCheckInDTO } from '@/dtos/create-check-in-dto';
import { IFindManyByUserIdDTO } from '@/dtos/find-many-by-user-id-dto';
import { IFindCheckInByUserIdAndDateDTO } from '@/dtos/find-check-in-by-user-id-and-date';

export interface ICheckInRepository {
  create(data: ICreateCheckInDTO): Promise<CheckIn>;
  findManyByUserId(data: IFindManyByUserIdDTO): Promise<CheckIn[]>;
  findByUserIdAndDate(
    data: IFindCheckInByUserIdAndDateDTO
  ): Promise<CheckIn | null>;
}
