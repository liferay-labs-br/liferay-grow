import { Query, Resolver } from 'type-graphql';

import PKG from '../../../package.json';
import { Configuration } from '../../interfaces';

@Resolver()
export class ConfigResolver {
  @Query(() => Configuration, { name: `getServerInfo` })
  getConfig(): Configuration {
    const { APP_NAME = 'Liferay Grow' } = process.env;

    const { version: SERVER_VERSION } = PKG;

    return {
      SERVER_NAME: APP_NAME,
      SERVER_VERSION,
    };
  }
}
