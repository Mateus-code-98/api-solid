import { Request, Response } from 'express';
import { GetUserProfileMapper } from '@/modules/users/mappers/get-user-profile/get-user-profile-mapper';
import { makeGetUserProfileUseCase } from '@/modules/users/factories/make-get-user-profile-use-case';

export const getUserProfileController = async (req: Request, res: Response) => {
  const { user_id } = GetUserProfileMapper.toDTO({
    user_id: req?.user?.id,
  });

  const getUserProfileUseCase = makeGetUserProfileUseCase();

  const { user } = await getUserProfileUseCase.execute({
    user_id,
  });

  return res.status(200).json({
    user: {
      ...user,
      password: undefined,
    },
  });
};
