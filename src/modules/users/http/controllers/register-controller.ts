import { Request, Response } from 'express';
import { makeRegisterUseCase } from '../../factories/make-register-use.case';
import { RegisterMapper } from '@/modules/users/mappers/register/register-mapper';

export const registerController = async (req: Request, res: Response) => {
  const { name, email, password } = RegisterMapper.toDTO(req.body);

  const registerUseCase = makeRegisterUseCase();

  await registerUseCase.execute({
    name,
    email,
    password,
  });

  return res.status(201).send();
};
