import { env } from '@/shared/env';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserAuthenticationError } from '@/shared/errors/user-authenticatation-error';

const { JWT_SECRET } = env;

export const UserAuthenticatedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new UserAuthenticationError();

  try {
    const token = authHeader.split(' ')[1];

    const decoded = verify(token, JWT_SECRET as string);

    req.user = { id: decoded.sub as string };

    return next();
  } catch (err) {
    throw new UserAuthenticationError();
  }
};
