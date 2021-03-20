import { ClayPaginationBarWithBasicItems } from '@clayui/pagination-bar';
import React from 'react';

import spritemap from '@/assets/spritemap.svg';

import ManagementToolbar from '../management-toolbar';
import TableComponent from '../table';

type IListView = {
  columns: any[];
  items: any[];
  orderBy?: boolean;
  activeDelta: number;
  activePage: number;
  totalItems: number;
  searchOnChange: (value: string) => void;
};

const ListView: React.FC<IListView> = ({
  activeDelta,
  activePage,
  columns,
  items,
  orderBy,
  searchOnChange,
  totalItems,
}) => {
  return (
    <>
      <ManagementToolbar orderBy={orderBy} searchOnChange={searchOnChange} />
      <TableComponent columns={columns} items={items} />
      <ClayPaginationBarWithBasicItems
        spritemap={spritemap}
        activeDelta={activeDelta}
        activePage={activePage}
        ellipsisBuffer={3}
        onPageChange={(page) => console.log(page)}
        onDeltaChange={(pageSize) => console.log(pageSize)}
        totalItems={totalItems}
      />
    </>
  );
};

export default ListView;
