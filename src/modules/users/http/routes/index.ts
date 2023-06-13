import { IRoutesProps } from '@/shared/utils/interfaces';
import { setUpRoutes } from '@/shared/utils/set-up-routes';
import { registerController } from '@/modules/users/http/controllers/register-controller';
import { getUserProfileController } from '../controllers/get-user-profile-controller';
import { UserAuthenticatedMiddleware } from '@/shared/http/middlewares/user-authenticated-middleware';

const routes: IRoutesProps[] = [
  {
    method: 'post',
    url: '/',
    middlewares: [registerController],
  },
  {
    method: 'get',
    url: '/me',
    middlewares: [UserAuthenticatedMiddleware, getUserProfileController],
  },
];

const usersRouter = setUpRoutes({ routes });

export { usersRouter };
