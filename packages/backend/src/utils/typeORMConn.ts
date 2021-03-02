import { config } from 'dotenv';
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm';

config();

const { ENVIRONMENT } = process.env;

export const createTypeormConn = async (): Promise<Connection> => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions(
    ENVIRONMENT,
  );
  return createConnection({ ...connectionOptions, name: 'default' });
};
