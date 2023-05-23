import { z } from 'zod';
import { Request, Response } from 'express';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use.case';

export const registerController = async (req: Request, res: Response) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  const registerUseCase = makeRegisterUseCase();

  await registerUseCase.execute({
    name,
    email,
    password,
  });

  return res.status(201).send();
};
