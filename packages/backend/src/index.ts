import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { config } from 'dotenv';
import Express from 'express';
import helmet from 'helmet';

import { Reports } from './controller/Reports';
import ApolloConfig from './utils/apolloConfig';
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
    const apolloServerConfig = await ApolloConfig.getApolloConfig();

    const apolloServer = new ApolloServer(apolloServerConfig);

    apolloServer.applyMiddleware({
      app: this.express,
      cors: true,
    });
  }

  private initializeControllers(): void {
    const ReportController = new Reports();

    this.express.get('/', (_, res) => res.json({ message: 'Liferay Grow' }));
    this.express.get(
      '/csv/export',
      ReportController.getKnowledgeSkillAndGapsCSV.bind(ReportController),
    );
  }

  private async initializeDatabase(): Promise<void> {
    try {
      const conn = await createTypeormConn();

      logger.debug('Database connected with success');

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
    this.express.use(cors());
    this.express.use(Express.json());
    this.express.use(Express.urlencoded({ extended: true }));
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
