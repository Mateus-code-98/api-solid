import { AppError } from '@/errors/AppError';

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super('User already exists', 409);
  }
}
