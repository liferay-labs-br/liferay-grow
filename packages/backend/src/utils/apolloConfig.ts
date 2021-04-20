import { Config } from 'apollo-server-express';
import { Request } from 'express';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

import { Profile } from '../entity/Profile';
import { MyContext } from '../interfaces';
import GraphQLSchema from './GraphQLSchema';
import logger from './logger';

class ApolloConfig {
  private defaultMaxAge = 30;

  private context({ req }: { req: Request }): MyContext {
    const loggedUser = this.getLoggedUser(req.headers.authorization);

    return {
      isAuthenticated: !!loggedUser,
      loggedUser,
    };
  }

  private formatError(error: GraphQLError) {
    const { message, path } = error;

    logger.error(
      `Message: ${message.toUpperCase()} / On Path: ${JSON.stringify(path)}`,
    );

    return error;
  }

  public async getApolloConfig(): Promise<Config> {
    const { APP_NAME, NODE_ENV, RUN_PLAYGROUND = true } = process.env;

    const playground = RUN_PLAYGROUND
      ? { title: APP_NAME, workspaceName: NODE_ENV }
      : false;

    const schema = await GraphQLSchema.getSchema();

    const apolloServerConfig: Config = {
      cacheControl: { defaultMaxAge: this.defaultMaxAge },
      context: this.context.bind(this),
      formatError: this.formatError,
      playground,
      schema,
    };

    if (NODE_ENV === 'production') {
      apolloServerConfig.introspection = true;
    }

    logger.debug(`${APP_NAME} environment: ${NODE_ENV}`);

    return apolloServerConfig;
  }

  private getLoggedUser(authorization: string | undefined): Profile | null {
    try {
      if (!authorization) {
        return null;
      }

      const token = authorization.split(' ').pop() || '';
      const user = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as Profile;

      return user;
    } catch (err) {
      return null;
    }
  }
}

export default new ApolloConfig();
