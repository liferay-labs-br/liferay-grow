import { Pagination } from 'src/interfaces';

import { applyFilters, paginate } from './globalMethods';

enum SortBy {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

export const getAllPagination = async (
  entity: any,
  data: any,
  relations: string[],
): Promise<{
  pagination: Pagination;
  rows: any[];
}> => {
  const { find, order, pageIndex = 1, pageSize = 20, sort = SortBy.ASC } = data;

  const orderBy = order ? { [order]: sort } : null;
  const where = applyFilters(find);
  let rows = [];

  const totalCount = await entity.count({
    where,
  });

  const pagination = paginate(totalCount, pageIndex, pageSize);

  try {
    rows = await entity.find({
      order: orderBy,
      relations,
      skip: pagination.startIndex,
      take: pageSize,
      where,
    });
  } catch (err) {}

  return {
    pagination,
    rows,
  };
};
