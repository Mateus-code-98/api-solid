import { Gym } from '@/shared/entities/Gym';
import { IGymsRepository } from '../gyms-repository';
import { ICreateGymDTO } from '../../dtos/create-gym-dto';
import { IFindManyNearbyDTO } from '../../dtos/find-many-nearby-dto';
import { IFindManyByGenericSearchDTO } from '../../dtos/find-many-by-generic-search-dto';
import { getDistanceBetweenCoordinates } from '@/shared/utils/get-distance-between-coordinates';
import {
  ITENS_PER_PAGE,
  NEARBY_DISTANCE_IN_KILOMETERS,
} from '@/shared/utils/constants';

export class InMemoryGymsRepository implements IGymsRepository {
  private gyms: Gym[] = [];

  async create(data: ICreateGymDTO) {
    const gymInstance = new Gym(data);

    this.gyms.push(gymInstance);

    return gymInstance;
  }

  async findById(id: string) {
    return this.gyms.find((gym) => gym.id === id) ?? null;
  }

  async findManyByGenericSearch({ page, search }: IFindManyByGenericSearchDTO) {
    const start = (page - 1) * ITENS_PER_PAGE;

    const attrToCompare = ['title', 'description', 'phone'] as Array<keyof Gym>;

    const gyms = this.gyms.filter((gym, index) => {
      const gymMatched = attrToCompare.find((field) => {
        const valueOfAttr = gym[field]?.toString().toLowerCase();
        return valueOfAttr?.includes(search.toLowerCase());
      });

      return gymMatched && index >= start;
    });

    return gyms;
  }

  async findManyNearby({ page, userLocation }: IFindManyNearbyDTO) {
    const start = (page - 1) * ITENS_PER_PAGE;
    const end = start + ITENS_PER_PAGE;

    const gymsNearbyWithCoordinates = this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates({
        from: gym,
        to: userLocation,
      });

      return distance <= NEARBY_DISTANCE_IN_KILOMETERS;
    });

    const gymsOrderedByDistance = gymsNearbyWithCoordinates.sort((a, b) => {
      const distanceA = getDistanceBetweenCoordinates({
        from: a,
        to: userLocation,
      });
      const distanceB = getDistanceBetweenCoordinates({
        from: b,
        to: userLocation,
      });

      return distanceA - distanceB;
    });

    const gyms = gymsOrderedByDistance.slice(start, end);

    return gyms;
  }

  async countNearby({ userLocation }: IFindManyNearbyDTO) {
    const gymsNearbyWithCoordinates = this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates({
        from: gym,
        to: userLocation,
      });

      return distance <= NEARBY_DISTANCE_IN_KILOMETERS;
    });

    return gymsNearbyWithCoordinates.length;
  }
}
