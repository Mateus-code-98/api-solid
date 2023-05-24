import { AppError } from '@/errors/app-error';

export class DistanceIsGreaterThenMaxDistanceError extends AppError {
  constructor() {
    super('Distance is greater than max distance', 400);
  }
}
