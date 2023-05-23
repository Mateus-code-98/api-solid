import { hash } from 'bcryptjs';
import { IUserRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';

interface IRegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email, password }: IRegisterUseCaseRequest) {
    const userWithSameEmail = await this.userRepository.findUserByEmail(email);

    if (userWithSameEmail) throw new UserAlreadyExistsError();

    const password_hash = await hash(password, 10);

    const user = await this.userRepository.create({
      email,
      name,
      password: password_hash,
    });

    return { user };
  }
}
