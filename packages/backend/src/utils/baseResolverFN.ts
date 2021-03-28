import { Pagination } from 'src/interfaces';

import { applyFilters, paginate } from './globalMethods';

export const getAllPagination = async (
  entity: any,
  where: any,
  relations: string[],
): Promise<{
  pagination: Pagination;
  rows: any[];
}> => {
  const { pageIndex = 1, pageSize = 20, search } = where;

  const totalCount = await entity.count({ where });

  const pagination = paginate(totalCount, search ? 1 : pageIndex, pageSize);

  const rows = await entity.find({
    relations,
    skip: pagination.startIndex,
    take: pagination.pageSize,
    where: applyFilters(search),
  });

  return {
    pagination,
    rows,
  };
};
