import { config } from 'dotenv';
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm';

import { logger } from '../utils/globalMethods';

config();

const { ENVIRONMENT } = process.env;

export const createTypeormConn = async (): Promise<Connection> => {
  logger.debug(`TypeORM Environment: ${ENVIRONMENT}`);
  const connectionOptions: ConnectionOptions = await getConnectionOptions(
    ENVIRONMENT,
  );
  return createConnection({ ...connectionOptions, name: 'default' });
};
