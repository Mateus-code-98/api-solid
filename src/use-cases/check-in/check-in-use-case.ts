import { CheckInSameDayError } from '../errors/check-in-same-day-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { IGymsRepository } from '@/repositories/gyms-repository/gyms-repository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { ICheckInRepository } from '@/repositories/check-in-repository/check-in-repository';
import { DistanceIsGreaterThenMaxDistanceError } from '../errors/distance-is-greater-than-max-distance-error';

interface ICheckInUseCaseRequest {
  user_id: string;
  gym_id: string;
  userLatitude: number;
  userLongitude: number;
}

export class CheckInUseCase {
  private MAX_DISTANCE_IN_KILOMETERS = 0.1;

  constructor(
    private checkInRepository: ICheckInRepository,
    private gymsRepository: IGymsRepository
  ) {}

  async execute({
    gym_id,
    user_id,
    userLatitude,
    userLongitude,
  }: ICheckInUseCaseRequest) {
    const gym = await this.gymsRepository.findById(gym_id);

    if (!gym) throw new ResourceNotFoundError();

    const distance = getDistanceBetweenCoordinates({
      from: { latitude: gym.latitude, longitude: gym.longitude },
      to: { latitude: userLatitude, longitude: userLongitude },
    });

    if (distance > this.MAX_DISTANCE_IN_KILOMETERS) {
      throw new DistanceIsGreaterThenMaxDistanceError();
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdAndDate({
      created_at: new Date(),
      user_id,
    });

    if (checkInOnSameDay) throw new CheckInSameDayError();

    const checkIn = await this.checkInRepository.create({
      gym_id,
      user_id,
    });

    return { checkIn };
  }
}
