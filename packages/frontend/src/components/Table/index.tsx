import ClayTable from '@clayui/table';
import React from 'react';

import DropDown from './DropDown';

interface ITable {
  borderless?: boolean;
  className?: string;
  actions: any[];
  columns: any[];
  items: any[];
}

const TableComponent = ({
  borderless,
  className,
  actions,
  columns = [],
  items = [],
}: ITable): React.ReactElement => {
  return (
    <ClayTable className={className} borderless={borderless}>
      <ClayTable.Head>
        <ClayTable.Row>
          {columns.map((column, index) => (
            <ClayTable.Cell key={index} expanded={index === 0} headingCell>
              {column.value}
            </ClayTable.Cell>
          ))}
        </ClayTable.Row>
      </ClayTable.Head>
      <ClayTable.Body>
        {items.map((item, index) => (
          <ClayTable.Row key={index}>
            {columns.map((column, indexC) => {
              const value = item[column.key];
              return (
                <ClayTable.Cell key={indexC} headingTitle={indexC === 0}>
                  {column.render ? column.render(value, item) : value || '-'}
                </ClayTable.Cell>
              );
            })}
            <ClayTable.Cell style={{ textAlign: 'right' }}>
              <DropDown actions={actions} item={item} />
            </ClayTable.Cell>
          </ClayTable.Row>
        ))}
      </ClayTable.Body>
    </ClayTable>
  );
};

export default TableComponent;
