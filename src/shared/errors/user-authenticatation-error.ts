import { AppError } from '@/shared/errors/app-error';

export class UserAuthenticationError extends AppError {
  constructor({ message = 'Authentication failed!' } = {}) {
    super(message, 401);
  }
}
