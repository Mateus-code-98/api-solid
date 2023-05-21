import { z } from 'zod';
import { Request, Response } from 'express';
import { RegisterUseCase } from '../../use-cases/register';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export const registerController = async (req: Request, res: Response) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  const prisamUsersRepository = new PrismaUsersRepository();

  const registerUseCase = new RegisterUseCase(prisamUsersRepository);

  await registerUseCase.execute({
    name,
    email,
    password,
  });

  return res.status(201).send();
};
