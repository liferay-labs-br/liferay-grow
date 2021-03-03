import { Query, Resolver } from 'type-graphql';

import PKG from '../../../package.json';
import { Configuration } from '../../interfaces';

const { APP_NAME = 'Graphscript Pocket' } = process.env;

@Resolver()
export class ConfigResolver {
  @Query(() => Configuration, { name: `getConfig` })
  getConfig(): Configuration {
    const { version: APP_VERSION } = PKG;
    return {
      APP_NAME,
      APP_VERSION,
    };
  }
}
