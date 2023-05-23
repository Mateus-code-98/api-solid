import { IUserRepository } from '@/repositories/users-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface IAuthenticateUseCaseRequest {
  userId: string;
}

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ userId }: IAuthenticateUseCaseRequest) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) throw new ResourceNotFoundError();

    return { user };
  }
}
