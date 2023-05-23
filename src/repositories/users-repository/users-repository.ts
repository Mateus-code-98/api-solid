import { User } from '@/entities/User';
import { ICreateUserDTO } from '@/dtos/create-user-dto';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
}
