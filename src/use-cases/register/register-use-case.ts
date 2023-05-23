import { hashSync } from 'bcryptjs';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { IUsersRepository } from '@/repositories/users-repository/users-repository';

interface IRegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRegisterUseCaseRequest) {
    const userWithSameEmail = await this.userRepository.findUserByEmail(email);

    if (userWithSameEmail) throw new UserAlreadyExistsError();

    const password_hash = hashSync(password, 10);

    const user = await this.userRepository.create({
      email,
      name,
      password: password_hash,
    });

    return { user };
  }
}
