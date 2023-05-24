import dayjs from 'dayjs';
import { CheckIn } from '@/entities/CheckIn';
import { ITENS_PER_PAGE } from '@/utils/constants';
import { ICheckInRepository } from '../check-in-repository';
import { ICreateCheckInDTO } from '@/dtos/create-check-in-dto';
import { ICountByUserIdDTO } from '@/dtos/count-by-user-id-dto';
import { IFindManyByUserIdDTO } from '@/dtos/find-many-by-user-id-dto';
import { IFindCheckInByUserIdAndDateDTO } from '@/dtos/find-check-in-by-user-id-and-date';

export class InMemoryCheckInRepository implements ICheckInRepository {
  private checkIns: CheckIn[] = [];

  async create(data: ICreateCheckInDTO) {
    const checkInInstance = new CheckIn(data);

    this.checkIns.push(checkInInstance);

    return checkInInstance;
  }

  async findByUserIdAndDate(data: IFindCheckInByUserIdAndDateDTO) {
    const { created_at, user_id } = data;

    const startOfTheDay = dayjs(created_at).startOf('date');
    const endOfTheDay = dayjs(created_at).endOf('date');

    const checkIn = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === user_id && isOnSameDate;
    });

    return checkIn ?? null;
  }

  async findManyByUserId({ user_id, page }: IFindManyByUserIdDTO) {
    const start = (page - 1) * ITENS_PER_PAGE;

    const checkIns = this.checkIns.filter(
      (checkIn, index) => checkIn.user_id === user_id && index >= start
    );

    return checkIns ?? [];
  }

  async countByUserId({ user_id }: ICountByUserIdDTO): Promise<number> {
    const checkIns = this.checkIns.filter(
      (checkIn) => checkIn.user_id === user_id
    );

    return checkIns.length;
  }
}
