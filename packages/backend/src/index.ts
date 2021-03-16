import 'reflect-metadata';

import { ApolloServer, Config } from 'apollo-server-express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import Express from 'express';
import helmet from 'helmet';

import createSchema from './utils/createSchema';
import { logger } from './utils/globalMethods';
import { createTypeormConn } from './utils/typeORMConn';
class App {
  public express: Express.Application;

  constructor() {
    config();
    this.express = Express();
    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeApollo();
  }

  private async initializeApollo(): Promise<void> {
    const { APP_NAME, NODE_ENV, RUN_PLAYGROUND = true } = process.env;

    logger.debug(`${APP_NAME} environment: ${NODE_ENV}`);

    const apolloServerConfig: Config = {
      cacheControl: { defaultMaxAge: 30 },
      context: ({ req, res }: any) => ({ req, res }),
      formatError: (error) => {
        const { message, path } = error;
        logger.error(
          `Message: ${message.toUpperCase()} / On Path: ${JSON.stringify(
            path,
          )}`,
        );
        return error;
      },
      playground: RUN_PLAYGROUND
        ? { title: APP_NAME, workspaceName: NODE_ENV }
        : false,
      schema: await createSchema(),
    };

    if (NODE_ENV === 'production') {
      apolloServerConfig.introspection = true;
    }
    const apolloServer = new ApolloServer(apolloServerConfig);

    apolloServer.applyMiddleware({
      app: this.express,
      cors: true,
    });
  }

  private initializeControllers(): void {
    this.express.get('/', (_, res) => res.json({ message: 'Hi!' }));
  }

  private async initializeDatabase(): Promise<void> {
    try {
      const conn = await createTypeormConn();

      logger.debug('Database connected success');

      const migrations = await conn.runMigrations({ transaction: 'all' });

      if (migrations.length) {
        logger.info(
          `Migrations executed: ${migrations
            .map(({ name }) => name)
            .join(', ')}`,
        );
      }
    } catch (e) {
      logger.error('Database connection error' + e.message);
    }
  }

  private initializeMiddlewares(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(helmet({ contentSecurityPolicy: false }));
  }

  public listen(): void {
    const { APP_NAME, HTTP_PORT = 3333 } = process.env;

    this.express.listen(HTTP_PORT, () => {
      logger.debug(`${APP_NAME} listening on the port ${HTTP_PORT}`);
    });
  }
}

const app = new App();

app.listen();
