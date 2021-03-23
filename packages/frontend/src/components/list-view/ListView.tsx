import { ClayPaginationBarWithBasicItems } from '@clayui/pagination-bar';
import React from 'react';

import { Pagination } from '@/types';

import EmptyState, { EmptyStateProps } from '../empty-state/EmptyState';
import ManagementToolbar from '../management-toolbar';
import TableComponent from '../table';

type IListView = {
  pagination: Pagination;
  columns: any[];
  items: any[];
  orderBy?: boolean;
  emptyState?: EmptyStateProps;
  searchOnChange: (value: string) => void;
};

const ListView: React.FC<IListView> = ({
  columns,
  emptyState,
  items,
  orderBy,
  pagination,
  searchOnChange,
}) => {
  const { currentPage, totalItems = 0 } = pagination || {};

  if (totalItems) {
    return (
      <>
        <ManagementToolbar orderBy={orderBy} searchOnChange={searchOnChange} />
        <TableComponent columns={columns} items={items} />
        <ClayPaginationBarWithBasicItems
          activeDelta={1}
          activePage={currentPage}
          spritemap={null}
          ellipsisBuffer={3}
          onPageChange={(page) => console.log(page)}
          onDeltaChange={(pageSize) => console.log(pageSize)}
          totalItems={totalItems}
        />
      </>
    );
  }

  return <EmptyState {...emptyState} />;
};

export default ListView;
