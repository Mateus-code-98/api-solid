import { AppError } from '@/shared/errors/app-error';

export class CheckInSameDayError extends AppError {
  constructor() {
    super('You already checked in today!', 400);
  }
}
