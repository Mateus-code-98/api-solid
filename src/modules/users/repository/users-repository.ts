import { User } from '@/shared/entities/User';
import { ICreateUserDTO } from '@/modules/users/dtos/create-user-dto';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
}
