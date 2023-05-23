import { z } from 'zod';
import { Request, Response } from 'express';
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case';

export const getUserProfileController = async (req: Request, res: Response) => {
  const getUserProfileParamsSchema = z.object({
    user_id: z.string().uuid(),
  });

  const { user_id } = getUserProfileParamsSchema.parse(req.params);

  const getUserProfileUseCase = makeGetUserProfileUseCase();

  await getUserProfileUseCase.execute({
    user_id,
  });

  return res.status(200).send();
};
