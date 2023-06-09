import { compareSync } from 'bcryptjs';
import { IUsersRepository } from '@/modules/users/repository/users-repository';
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error';

interface IExecute {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(private readonly userRepository: IUsersRepository) {}

  async execute({ email, password }: IExecute) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new InvalidCredentialsError();

    const passwordMatch = compareSync(password, user.password);
    if (!passwordMatch) throw new InvalidCredentialsError();

    return { user };
  }
}
