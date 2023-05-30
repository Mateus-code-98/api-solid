import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { IUsersRepository } from '@/repositories/users-repository/users-repository';

interface IExecute {
  user_id: string;
}

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: IUsersRepository) {}

  async execute({ user_id }: IExecute) {
    const user = await this.userRepository.findUserById(user_id);

    if (!user) throw new ResourceNotFoundError();

    return { user };
  }
}
