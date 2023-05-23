import { User } from '@/entities/User';
import { IUsersRepository } from '../users-repository';
import { ICreateUserDTO } from '@/dtos/create-user-dto';

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async create({ email, name, password }: ICreateUserDTO) {
    const user = new User({ email, name, password });

    this.users.push(user);

    return user;
  }

  async findUserByEmail(email: string) {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async findUserById(id: string) {
    return this.users.find((user) => user.id === id) ?? null;
  }
}
