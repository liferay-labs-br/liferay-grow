import jwt from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';

import { MyContext } from '../interfaces';
import { constants, getGraphqlOperation, logger } from '../utils/globalMethods';

const { AUTH_INVALID_TOKEN, AUTH_NOT_FOUND } = constants;
const { AUTH_MIDDLEWARE_ENABLED, JWT_SECRET } = process.env;

export const isAuth: MiddlewareFn<MyContext> = async (ctx, next) => {
  if (AUTH_MIDDLEWARE_ENABLED) {
    const {
      body,
      headers: { authorization },
    } = ctx.context.req;
    const operationName = getGraphqlOperation(body.query);
    if (authorization) {
      const token: string = authorization.split(' ').pop() || '';
      try {
        const user: any = jwt.verify(token, JWT_SECRET as string);
        ctx.context.req.headers.loggedUser = user;
        logger.debug(
          `${user.name} is running a graphQL request to ${operationName}`,
        );
        return next();
      } catch (e) {
        throw new Error(AUTH_INVALID_TOKEN);
      }
    }
    throw new Error(AUTH_NOT_FOUND);
  }
  return next();
};
