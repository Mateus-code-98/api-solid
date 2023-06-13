import { IRoutesProps } from '@/shared/utils/interfaces';
import { setUpRoutes } from '@/shared/utils/set-up-routes';
import { authenticateController } from '../controllers/authenticate-controller';

const routes: IRoutesProps[] = [
  {
    method: 'post',
    url: '/sessions',
    middlewares: [authenticateController],
  },
];

const generalRouter = setUpRoutes({ routes });

export { generalRouter };
