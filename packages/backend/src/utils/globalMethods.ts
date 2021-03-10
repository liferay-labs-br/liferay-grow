import { gql } from 'apollo-server-express';
import { EntityOptions, Like } from 'typeorm';

import { User } from '../entity/User';
import { MyContext } from '../interfaces/MyContext';
import Constants from '../utils/contants';
import Logger from '../utils/logger';

export const constants = Constants;
export const logger = Logger;

export const applyFilters = (where: any = {}): any => {
  const data: any = {};

  for (const key in where) {
    const value = where[key];

    data[key] =
      typeof value === 'string' && value.includes('%') ? Like(value) : value;
  }

  return data;
};

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

export function paginate(
  totalItems: number,
  currentPage = 1,
  pageSize = 10,
  maxPages = 10,
): {
  currentPage: number;
  endIndex: number;
  endPage: number;
  pageSize: number;
  pages: number[];
  startIndex: number;
  startPage: number;
  totalItems: number;
  totalPages: number;
} {
  // calculate total pages
  const totalPages = Math.ceil(totalItems / pageSize);

  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage: number, endPage: number;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to the pager control
  const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
    (i) => startPage + i,
  );

  // return object with all pager properties required by the view
  return {
    currentPage,
    endIndex,
    endPage,
    pageSize,
    pages,
    startIndex,
    startPage,
    totalItems,
    totalPages,
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
