import { ConnectionOptions } from 'typeorm';

// If you need some different configuration, please read this doc
// https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md

const options: ConnectionOptions[] = [
  {
    cli: {
      migrationsDir: './src/migration',
    },
    database: 'liferay-grow',
    entities: ['./src/entity/*{.ts,.js}'],
    host: 'localhost',
    migrations: ['./src/migration/*{.ts,.js}'],
    name: 'development',
    password: '',
    port: 3306,
    type: 'mysql',
    username: 'root',
  },
  {
    database: 'graphscript.sqlite',
    dropSchema: true,
    entities: ['./src/entity/*{.ts,.js}'],
    logging: true,
    name: 'test',
    synchronize: true,
    type: 'sqlite',
  },
];

export default options;
