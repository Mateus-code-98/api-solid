import { randomUUID } from 'crypto';

interface IConstructorParams {
  gym_id: string;
  user_id: string;
}

export class CheckIn {
  public readonly id: string;
  public readonly created_at: Date;
  public readonly validated_at: Date | null;
  public user_id: string;
  public gym_id: string;

  constructor({ gym_id, user_id }: IConstructorParams) {
    this.id = randomUUID();
    this.user_id = user_id;
    this.gym_id = gym_id;
    this.created_at = new Date();
    this.validated_at = null;
  }
}
