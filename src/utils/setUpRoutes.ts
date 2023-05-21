import { Router } from 'express';
import { IRoutesProps } from './interfaces';

interface ISetUpRoutesProps {
  routes: IRoutesProps[];
}

export const setUpRoutes = (props: ISetUpRoutesProps) => {
  const { routes } = props;

  const router = Router();

  routes.forEach((route) =>
    router[route.method](route.url, ...route.middlewares)
  );

  return router;
};
