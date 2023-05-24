import { Gym } from '@/entities/Gym';

export interface ICreateGymDTO extends Omit<Gym, 'id' | 'created_at'> {}
