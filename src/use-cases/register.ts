import { hash } from 'bcryptjs';
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface IRegisterUseCaseProps {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private prismaUsersRepository: PrismaUsersRepository) {}

  async execute({ name, email, password }: IRegisterUseCaseProps) {
    const userWithSameEmail = await this.prismaUsersRepository.findUserByEmail(
      email
    );

    if (userWithSameEmail) throw new UserAlreadyExistsError();

    const password_hash = await hash(password, 10);

    await this.prismaUsersRepository.create({
      email,
      name,
      password: password_hash,
    });
  }
}
