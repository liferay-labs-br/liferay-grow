/* eslint-disable @typescript-eslint/no-empty-function */
import { ClayPaginationBarWithBasicItems } from '@clayui/pagination-bar';
import React from 'react';

import { Pagination } from '@/types';

import EmptyState, { EmptyStateProps } from '../empty-state/EmptyState';
import ManagementToolbar from '../management-toolbar';
import TableComponent, { ColumnProps } from '../table';

const deltas = [10, 20, 40, 50, 100].map((delta) => ({ label: delta }));

type FilterItems = {
  label: string;
  name: string;
  active?: boolean;
  onClick?: () => void;
};

type Variables = {
  data: {
    find?: any;
    order?: string;
    pageIndex?: number;
    pageSize?: number;
    sort?: string;
  };
};

type IListView<T> = {
  pagination: Pagination;
  columns: ColumnProps<T>[];
  items: T[];
  formatVariables?: (variables: Variables) => void;
  orderBy?: boolean;
  filterItems?: FilterItems[];
  className?: string;
  emptyState?: EmptyStateProps;
  variables?: Variables;
  refetch: (variables: any) => void;
  onPageChange?: (page: number) => void;
  onDeltaChange?: (delta: number) => void;
  searchOnChange?: (value: string) => void;
};

const ListView = <T,>({
  className,
  columns,
  emptyState,
  filterItems = [],
  items,
  orderBy,
  formatVariables,
  pagination,
  refetch,
  variables = {} as Variables,
}: IListView<T>): React.ReactElement => {
  const { currentPage, totalItems = 0 } = pagination || {};

  const doGraphQLOperations = !!refetch;

  const activeSortBy = filterItems.find(({ active }) => active)?.name || 'name';

  const onResourceChange = async (type, value) => {
    if (doGraphQLOperations) {
      const data = {
        data: {
          ...variables.data,
          [type]: value,
        },
      };

      const formattedVariables = formatVariables ? formatVariables(data) : data;

      await refetch(formattedVariables);
    }
  };

  return (
    <div className={className}>
      <ManagementToolbar
        orderBy={orderBy}
        totalItems={pagination.totalItems}
        searchText={
          variables?.data?.find ? variables.data.find[activeSortBy] : null
        }
        onClickSearch={(value) => {
          onResourceChange('find', {
            [activeSortBy]: `%${value}%`,
          });
        }}
        onClickOrderBy={() =>
          onResourceChange(
            'sort',
            variables.data.sort === 'ASC' ? 'DESC' : 'ASC',
          )
        }
        filterItems={filterItems}
      />

      {pagination.totalItems > 0 ? (
        <>
          <TableComponent columns={columns} items={items} />

          <ClayPaginationBarWithBasicItems
            activeDelta={pagination.pageSize}
            deltas={deltas}
            activePage={currentPage}
            spritemap={null}
            ellipsisBuffer={3}
            onPageChange={(value) => onResourceChange('pageIndex', value)}
            onDeltaChange={(value) => onResourceChange('pageSize', value)}
            totalItems={totalItems}
          />
        </>
      ) : (
        <EmptyState {...emptyState} />
      )}
    </div>
  );
};

export default ListView;
