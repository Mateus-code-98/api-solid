import { z } from 'zod';
import { Request, Response } from 'express';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';

export const authenticateController = async (req: Request, res: Response) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  const authenticateUseCase = makeAuthenticateUseCase();

  await authenticateUseCase.execute({
    email,
    password,
  });

  return res.status(200).send();
};
