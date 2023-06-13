import { Gym } from '@/shared/entities/Gym';

export interface ICreateGymDTO extends Omit<Gym, 'id' | 'created_at'> {}
