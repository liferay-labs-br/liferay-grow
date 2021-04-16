import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';

import { Profile } from '../entity/Profile';
import { MyContext } from '../interfaces';
import { constants } from '../utils/globalMethods';

const { AUTH_INVALID_TOKEN, AUTH_NOT_FOUND } = constants;

class AuthMiddleware {
  private getValidPayload = (request: Request): Profile => {
    const { JWT_SECRET } = process.env;
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new Error(AUTH_NOT_FOUND);
    }

    const token = authorization.split(' ').pop() || '';
    const user: any = jwt.verify(token, JWT_SECRET as string);

    return user;
  };

  public getLoggedUser = (request: Request): Profile | null => {
    try {
      return this.getValidPayload(request);
    } catch (err) {}

    return null;
  };

  public isAuth: MiddlewareFn<MyContext> = async (ctx, next) => {
    const { AUTH_MIDDLEWARE_ENABLED } = process.env;

    if (
      !AUTH_MIDDLEWARE_ENABLED ||
      (AUTH_MIDDLEWARE_ENABLED && ctx.context.isAuthenticated)
    ) {
      return next();
    }

    throw new Error(AUTH_INVALID_TOKEN);
  };
}

export default new AuthMiddleware();
