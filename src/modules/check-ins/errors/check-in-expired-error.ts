import { AppError } from '@/shared/errors/app-error';

export class CheckInExpiredError extends AppError {
  constructor() {
    super('Check in expired!', 400);
  }
}
