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
  const { pageIndex = 1, pageSize = 20, ...search } = where;

  const filter = applyFilters(search);

  const totalCount = await entity.count({ where: filter });

  const pagination = paginate(totalCount, pageIndex, pageSize);

  const rows = await entity.find({
    relations,
    skip: pagination.startIndex,
    take: pagination.pageSize,
    where: filter,
  });

  return {
    pagination,
    rows,
  };
};
