import { compareSync } from 'bcryptjs';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { IUsersRepository } from '@/repositories/users-repository/users-repository';

interface IAuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(private readonly userRepository: IUsersRepository) {}

  async execute({ email, password }: IAuthenticateUseCaseRequest) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) throw new InvalidCredentialsError();

    const passwordMatch = compareSync(password, user.password);

    if (!passwordMatch) throw new InvalidCredentialsError();

    return { user };
  }
}
