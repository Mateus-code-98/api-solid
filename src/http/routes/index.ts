import cors from 'cors';
import express from 'express';
import { IRoutesProps } from '@/utils/interfaces';
import { setUpRoutes } from '@/utils/set-up-routes';
import { registerController } from '../controllers/register-controller';
import { ExceptionHandler } from '@/http/middlewares/exception-handler';
import { authenticateController } from '../controllers/authenticate-controller';
import { getUserProfileController } from '../controllers/get-user-profile-controller';

const routes: IRoutesProps[] = [
  { method: 'use', url: '', middlewares: [cors()] },
  { method: 'use', url: '', middlewares: [express.json()] },
  { method: 'post', url: '/users', middlewares: [registerController] },
  {
    method: 'post',
    url: '/sessions',
    middlewares: [authenticateController],
  },
  {
    method: 'get',
    url: '/users/:user_id',
    middlewares: [getUserProfileController],
  },
  { method: 'use', url: '', middlewares: [ExceptionHandler] },
];

const router = setUpRoutes({ routes });

export { router };
