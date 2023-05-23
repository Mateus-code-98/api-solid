import { compare } from 'bcryptjs';
import { IUserRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

interface IAuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ email, password }: IAuthenticateUseCaseRequest) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) throw new InvalidCredentialsError();

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new InvalidCredentialsError();

    return { user };
  }
}
