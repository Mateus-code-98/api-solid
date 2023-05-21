import cors from 'cors';
import express from 'express';
import { IRoutesProps } from '@/utils/interfaces';
import { setUpRoutes } from '@/utils/setUpRoutes';
import { registerController } from '../controllers/register';
import { ExceptionHandler } from '@/middlewares/exceptionHandler';

const routes: IRoutesProps[] = [
  { method: 'use', url: '', middlewares: [cors()] },
  { method: 'use', url: '', middlewares: [express.json()] },
  { method: 'post', url: '/users', middlewares: [registerController] },
  { method: 'use', url: '', middlewares: [ExceptionHandler] },
];

const router = setUpRoutes({ routes });

export { router };
