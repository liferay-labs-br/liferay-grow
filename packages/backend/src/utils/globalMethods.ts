import { gql } from 'apollo-server-express';
import { EntityOptions } from 'typeorm';

import { User } from '../entity/User';
import { Pagination } from '../interfaces';
import { MyContext } from '../interfaces/MyContext';
import Constants from '../utils/contants';
import Logger from '../utils/logger';

export const constants = Constants;
export const logger = Logger;

/**
 *
 * @param graphqlQuery GQL Request
 * @returns A string with the operation name
 */

export function getGraphqlOperation(graphqlQuery: any): string {
  try {
    const GQL = gql`
      ${graphqlQuery}
    `;
    const operations = GQL.definitions.map(
      (query: any) =>
        `${query.operation} ${
          query.name
            ? query.name.value
            : query.selectionSet.selections[0].name.value
        }`,
    );
    return `[${operations.join(', ')}]`;
  } catch (e) {
    logger.error(`Error in getGraphqlOperation, reason: ${e.message}`);
    return 'Unknown';
  }
}

/**
 *
 * @param pagination Pagination Object
 * @param defaultSize How many items will be displayed, default = 20
 */

export function normalizePagination(
  pagination: Pagination,
  defaultSize = 20,
): Pagination {
  const pageSize = pagination.pageSize || defaultSize;
  const pageIndex = pagination.pageIndex || 1;
  const take = pageSize;
  let skip = 0;

  if (pageIndex > 1) {
    skip = take * (pageIndex - 1);
  }

  return {
    pageIndex,
    pageSize,
    skip,
    take,
  };
}

export const getLoggedUserFromCtx = (ctx: MyContext): any => {
  const loggedUser: any = ctx.req.headers.loggedUser || {};

  return loggedUser;
};

export const getUserFromCtxOrFail = async (
  ctx: MyContext,
  relations: string[] = [],
): Promise<User> => {
  const loggedUser = getLoggedUserFromCtx(ctx);
  const {
    user: { id },
  } = loggedUser;

  try {
    const user = await User.findOneOrFail(id, { relations });
    return user;
  } catch (e) {
    throw new Error('User not exists');
  }
};

export async function execMiddleware(
  entity: EntityOptions,
  data: any,
  ...middlewares: Array<(entity: EntityOptions, data: any) => void>
): Promise<void> {
  for (const middleware of middlewares) {
    await middleware(entity, data);
  }
}
