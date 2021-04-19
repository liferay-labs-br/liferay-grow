import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { Profile } from '../entity/Profile';
import { constants } from '../utils/globalMethods';

const { AUTH_NOT_FOUND } = constants;

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
}

export default new AuthMiddleware();
