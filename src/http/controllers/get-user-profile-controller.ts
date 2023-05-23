import { z } from 'zod';
import { Request, Response } from 'express';
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case';

export const getUserProfileController = async (req: Request, res: Response) => {
  const getUserProfileParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = getUserProfileParamsSchema.parse(req.params);

  const getUserProfileUseCase = makeGetUserProfileUseCase();

  await getUserProfileUseCase.execute({
    userId,
  });

  return res.status(200).send();
};
