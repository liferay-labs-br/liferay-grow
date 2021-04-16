import { Config } from 'apollo-server-express';
import { Request } from 'express';
import { GraphQLError } from 'graphql';

import { MyContext } from '../interfaces';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import createSchema from './createSchema';
import logger from './logger';

class ApolloConfig {
  private defaultMaxAge = 30;

  private formatError(error: GraphQLError) {
    const { message, path } = error;

    logger.error(
      `Message: ${message.toUpperCase()} / On Path: ${JSON.stringify(path)}`,
    );

    return error;
  }

  private context({ req }: { req: Request }): MyContext {
    const loggedUser = AuthMiddleware.getLoggedUser(req);

    return {
      isAuthenticated: !!loggedUser,
      loggedUser,
    };
  }

  async getApolloConfig(): Promise<Config> {
    const { APP_NAME, NODE_ENV, RUN_PLAYGROUND = true } = process.env;

    const playground = RUN_PLAYGROUND
      ? { title: APP_NAME, workspaceName: NODE_ENV }
      : false;

    const schema = await createSchema();

    const apolloServerConfig: Config = {
      cacheControl: { defaultMaxAge: this.defaultMaxAge },
      context: this.context,
      formatError: this.formatError,
      introspection: NODE_ENV === 'production',
      playground,
      schema,
    };

    logger.debug(`${APP_NAME} environment: ${NODE_ENV}`);

    return apolloServerConfig;
  }
}

export default new ApolloConfig();
