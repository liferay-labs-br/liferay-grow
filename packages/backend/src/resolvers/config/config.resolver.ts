import { Query, Resolver } from 'type-graphql';

import PKG from '../../../package.json';
import { Configuration } from '../../interfaces';

@Resolver()
export class ConfigResolver {
  @Query(() => Configuration, { name: `getConfig` })
  getConfig(): Configuration {
    const { version: APP_VERSION } = PKG;
    return {
      APP_NAME: 'Graphscript Pocket',
      APP_VERSION,
    };
  }
}
