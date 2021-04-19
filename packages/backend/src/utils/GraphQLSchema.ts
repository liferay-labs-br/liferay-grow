import { GraphQLSchema as IGraphQLSchema } from 'graphql';
import { AuthChecker, buildSchema } from 'type-graphql';

import { MyContext } from '../interfaces';

class GraphQLSchema {
  private resolversPath = `${__dirname}/../resolvers/**/*.resolver.{ts,js}`;

  private customAuthChecker: AuthChecker<MyContext> = ({ context }) => {
    const { AUTH_MIDDLEWARE_ENABLED } = process.env;

    return Boolean(
      !AUTH_MIDDLEWARE_ENABLED ||
        (AUTH_MIDDLEWARE_ENABLED && context.isAuthenticated),
    );

    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
  };

  getSchema(): Promise<IGraphQLSchema> {
    return buildSchema({
      authChecker: this.customAuthChecker,
      resolvers: [this.resolversPath],
    });
  }
}

export default new GraphQLSchema();
