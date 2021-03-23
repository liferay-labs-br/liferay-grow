import jwt from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';

import { MyContext } from '../interfaces';
import { constants } from '../utils/globalMethods';

const { AUTH_INVALID_TOKEN, AUTH_NOT_FOUND } = constants;
const { AUTH_MIDDLEWARE_ENABLED, JWT_SECRET } = process.env;

export const isAuth: MiddlewareFn<MyContext> = async (ctx, next) => {
  if (AUTH_MIDDLEWARE_ENABLED) {
    const {
      headers: { authorization },
    } = ctx.context.req;
    if (authorization) {
      const token: string = authorization.split(' ').pop() || '';
      try {
        const user: any = jwt.verify(token, JWT_SECRET as string);
        ctx.context.req.headers.loggedUser = user;
        return next();
      } catch (e) {
        throw new Error(AUTH_INVALID_TOKEN);
      }
    }
    throw new Error(AUTH_NOT_FOUND);
  }
  return next();
};
