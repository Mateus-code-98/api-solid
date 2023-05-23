import { Prisma, User } from '@prisma/client';
import { IUserRepository } from '../users-repository';

export class InMemoryUsersRepository implements IUserRepository {
  public users: User[] = [];

  async create({ email, name, password }: Prisma.UserCreateInput) {
    const user: User = {
      id: String(this.users.length + 1),
      email,
      name,
      password,
      created_at: new Date(),
    };

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
