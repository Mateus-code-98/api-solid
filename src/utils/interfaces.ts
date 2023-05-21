export type RouteMethodsTypes = 'get' | 'post' | 'put' | 'delete' | 'use';

export interface IRoutesProps {
  url: string;
  method: RouteMethodsTypes;
  middlewares: any[];
}
