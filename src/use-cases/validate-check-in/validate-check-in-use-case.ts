import dayjs from 'dayjs';
import { MILLISSECONDS_TO_VALIDATE_CHECK_IN } from '@/utils/constants';
import { CheckInExpiredError } from '../errors/check-in-expired-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { ICheckInRepository } from '@/repositories/check-in-repository/check-in-repository';

interface IExecute {
  check_in_id: string;
}

export class ValidateCheckInInUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute({ check_in_id }: IExecute) {
    const checkIn = await this.checkInRepository.findById({ id: check_in_id });

    if (!checkIn?.id) {
      throw new ResourceNotFoundError();
    }

    const distanceInMillisecondsFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'milliseconds'
    );

    if (
      distanceInMillisecondsFromCheckInCreation >
      MILLISSECONDS_TO_VALIDATE_CHECK_IN
    ) {
      throw new CheckInExpiredError();
    }

    checkIn.validated_at = new Date();

    return { checkIn };
  }
}
