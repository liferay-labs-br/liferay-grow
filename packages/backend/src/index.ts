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
  public apolloConfig: Config;
  public apollo: ApolloServer;

  constructor () {
    config();
    this.express = Express();
    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeApollo();
  }

  private async initializeApollo (): Promise<void> {
    const { APP_NAME, ENVIRONMENT, RUN_PLAYGROUND = true } = process.env;

    const apolloServerConfig: Config = {
      cacheControl: { defaultMaxAge: 30 },
      context: ({ req, res }: any) => ({ req, res }),
      formatError: (error) => {
        const { message, path } = error;
        logger.error(
          `Message: ${message.toUpperCase()} / On Path: ${JSON.stringify(
            path
          )}`
        );
        return error;
      },
      playground: RUN_PLAYGROUND
        ? { title: APP_NAME, workspaceName: ENVIRONMENT }
        : false,
      schema: await createSchema()
    };

    if (ENVIRONMENT === 'production') {
      apolloServerConfig.introspection = true;
    }
    const apolloServer = new ApolloServer(apolloServerConfig);

    apolloServer.applyMiddleware({
      app: this.express,
      cors: true
    });
  }

  private initializeMiddlewares (): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(helmet({ contentSecurityPolicy: false }));
  }

  private async initializeDatabase (): Promise<void> {
    try {
      await createTypeormConn();
    } catch (e) {
      logger.error('Database connection error' + e.message);
    }
  }

  private initializeControllers (): void {
    this.express.get('/', (_, res) => res.json({ message: 'Hi!' }));
  }

  public listen (): void {
    const { APP_NAME, PORT = 3333 } = process.env;

    logger.debug(`Starting ${APP_NAME} Server`);

    this.express.listen(PORT, () => {
      logger.debug(`App listening on the port ${PORT}`);
    });
  }
}

const app = new App();

app.listen();
