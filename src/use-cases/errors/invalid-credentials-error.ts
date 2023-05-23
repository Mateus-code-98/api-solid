import { AppError } from '@/errors/app-error';

export class InvalidCredentialsError extends AppError {
  constructor() {
    super('Invalid credentials!', 401);
  }
}
