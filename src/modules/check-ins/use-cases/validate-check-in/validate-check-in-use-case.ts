import dayjs from 'dayjs';
import { ICheckInRepository } from '../../repository/check-in-repository';
import { MILLISSECONDS_TO_VALIDATE_CHECK_IN } from '@/shared/utils/constants';
import { CheckInExpiredError } from '@/modules/check-ins/errors/check-in-expired-error';
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error';

interface IExecute {
  check_in_id: string;
}

export class ValidateCheckInUseCase {
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

    await this.checkInRepository.update(checkIn);

    return { checkIn };
  }
}
