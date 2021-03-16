import { config } from 'dotenv';
import { Connection, createConnection } from 'typeorm';

config();

export const createTypeormConn = async (): Promise<Connection> => {
  return createConnection();
};
