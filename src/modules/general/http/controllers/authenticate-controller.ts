import { env } from '@/shared/env';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { AuthenticateMapper } from '@/shared/mappers/authenticate/authenticate-mapper';
import { makeAuthenticateUseCase } from '@/modules/general/factories/make-authenticate-use-case';

const { JWT_SECRET, JWT_EXPIRESIN } = env;

export const authenticateController = async (req: Request, res: Response) => {
  const { email, password } = AuthenticateMapper.toDTO(req.body);

  const authenticateUseCase = makeAuthenticateUseCase();

  const { user } = await authenticateUseCase.execute({
    email,
    password,
  });

  const token = sign({}, JWT_SECRET as string, {
    subject: user.id,
    expiresIn: JWT_EXPIRESIN,
  });

  return res.status(200).json({ user, token });
};
