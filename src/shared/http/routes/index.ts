import cors from 'cors';
import express from 'express';
import { gymsRouter } from '@/modules/gyms/http/routes';
import { IRoutesProps } from '@/shared/utils/interfaces';
import { usersRouter } from '@/modules/users/http/routes';
import { setUpRoutes } from '@/shared/utils/set-up-routes';
import { generalRouter } from '@/modules/general/http/routes';
import { checkInsRouter } from '@/modules/check-ins/http/routes';
import { ExceptionHandlerMiddleware } from '@/shared/http/middlewares/exception-handler-middleware';

const routes: IRoutesProps[] = [
  {
    method: 'use',
    url: '',
    middlewares: [cors()],
  },
  {
    method: 'use',
    url: '',
    middlewares: [express.json()],
  },
  {
    method: 'use',
    url: '/users',
    middlewares: [usersRouter],
  },
  {
    method: 'use',
    url: '/gyms',
    middlewares: [gymsRouter],
  },
  {
    method: 'use',
    url: '/check-ins',
    middlewares: [checkInsRouter],
  },
  {
    method: 'use',
    url: '/',
    middlewares: [generalRouter],
  },
  {
    method: 'use',
    url: '',
    middlewares: [ExceptionHandlerMiddleware],
  },
];

const router = setUpRoutes({ routes });

export { router };
