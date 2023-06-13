import { IRoutesProps } from '@/shared/utils/interfaces';
import { setUpRoutes } from '@/shared/utils/set-up-routes';

const routes: IRoutesProps[] = [];

const gymsRouter = setUpRoutes({ routes });

export { gymsRouter };
