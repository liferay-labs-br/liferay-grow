/* eslint-disable @typescript-eslint/no-empty-function */
import { ClayPaginationBarWithBasicItems } from '@clayui/pagination-bar';
import React from 'react';

import { Pagination } from '@/types';

import EmptyState, { EmptyStateProps } from '../empty-state/EmptyState';
import ManagementToolbar from '../management-toolbar';
import TableComponent from '../table';

const deltas = [10, 20, 40, 50, 100].map((delta) => ({ label: delta }));

type IListView = {
  pagination: Pagination;
  columns: any[];
  items: any[];
  orderBy?: boolean;
  emptyState?: EmptyStateProps;
  onPageChange?: (page: number) => void;
  onDeltaChange?: (delta: number) => void;
  searchOnChange?: (value: string) => void;
};

const ListView: React.FC<IListView> = ({
  columns,
  emptyState,
  items,
  onDeltaChange = () => {},
  onPageChange = () => {},
  orderBy,
  pagination,
  searchOnChange = () => {},
}) => {
  const { currentPage, totalItems = 0 } = pagination || {};

  if (totalItems) {
    return (
      <>
        <ManagementToolbar orderBy={orderBy} searchOnChange={searchOnChange} />
        <TableComponent columns={columns} items={items} />
        <ClayPaginationBarWithBasicItems
          activeDelta={pagination.pageSize}
          deltas={deltas}
          activePage={currentPage}
          spritemap={null}
          ellipsisBuffer={3}
          onPageChange={onPageChange}
          onDeltaChange={onDeltaChange}
          totalItems={totalItems}
        />
      </>
    );
  }

  return <EmptyState {...emptyState} />;
};

export default ListView;
