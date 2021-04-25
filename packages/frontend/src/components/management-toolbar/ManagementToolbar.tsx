import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayDropDownWithItems } from '@clayui/drop-down';
import { ClayInput } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayManagementToolbar, {
  ClayResultsBar,
} from '@clayui/management-toolbar';
import React, { useState } from 'react';

import useLang from '@/hooks/useLang';

type FilterItems = {
  label: string;
  active?: boolean;
  name: string;
  onClick?: () => void;
};

type ManagementToolbarProps = {
  searchText?: string;
  orderBy?: boolean;
  listType?: string;
  totalItems?: number;
  onClickOrderBy?: () => void;
  onClickSearch?: (value: string) => void;
  info?: boolean;
  filterItems?: FilterItems[];
  addButton?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const ManagementToolbar: React.FC<ManagementToolbarProps> = ({
  addButton,
  filterItems,
  info,
  listType,
  onClickOrderBy,
  onClickSearch,
  orderBy,
  searchText,
  totalItems,
}) => {
  const i18n = useLang();

  const viewTypes = [
    {
      label: i18n.get('list'),
      onClick: () => alert('Show view list'),
      symbolLeft: 'list',
    },
    {
      active: true,
      label: i18n.get('table'),
      onClick: () => alert('Show view table'),
      symbolLeft: 'table',
    },
    {
      label: i18n.get('card'),
      onClick: () => alert('Show view card'),
      symbolLeft: 'cards2',
    },
  ];

  const [searchMobile, setSearchMobile] = useState(false);
  const [search, setSearch] = useState('');

  const searchValue = searchText?.replaceAll('%', '');
  const viewTypeActive = viewTypes.find((type) => type.active);

  return (
    <>
      <ClayManagementToolbar>
        <ClayManagementToolbar.ItemList>
          <ClayDropDownWithItems
            items={filterItems}
            trigger={
              <ClayButton className="nav-link" displayType="unstyled">
                <span className="navbar-breakpoint-down-d-none">
                  <span className="navbar-text-truncate">
                    {i18n.get('filter-and-order')}
                  </span>

                  <ClayIcon
                    className="inline-item inline-item-after"
                    symbol="caret-bottom"
                  />
                </span>
                <span className="navbar-breakpoint-d-none">
                  <ClayIcon symbol="filter" />
                </span>
              </ClayButton>
            }
          />

          {orderBy && (
            <ClayManagementToolbar.Item>
              <ClayButton
                onClick={onClickOrderBy}
                className="nav-link nav-link-monospaced order-arrow-down-active"
                displayType="unstyled"
              >
                <ClayIcon symbol="order-arrow" />
              </ClayButton>
            </ClayManagementToolbar.Item>
          )}
        </ClayManagementToolbar.ItemList>

        <ClayManagementToolbar.Search
          showMobile={searchMobile}
          onSubmit={(event) => {
            event.preventDefault();
            onClickSearch(search);
          }}
        >
          <ClayInput.Group>
            <ClayInput.GroupItem>
              <ClayInput
                aria-label="Search"
                className="form-control input-group-inset input-group-inset-after"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="text"
              />
              <ClayInput.GroupInsetItem after tag="span">
                <ClayButtonWithIcon
                  className="navbar-breakpoint-d-none"
                  displayType="unstyled"
                  onClick={() => alert(false)}
                  symbol="times"
                />
                <ClayButtonWithIcon
                  onClick={() => onClickSearch(search)}
                  displayType="unstyled"
                  symbol="search"
                />
              </ClayInput.GroupInsetItem>
            </ClayInput.GroupItem>
          </ClayInput.Group>
        </ClayManagementToolbar.Search>

        <ClayManagementToolbar.ItemList>
          <ClayManagementToolbar.Item className="navbar-breakpoint-d-none">
            <ClayButton
              className="nav-link nav-link-monospaced"
              displayType="unstyled"
              onClick={() => setSearchMobile(true)}
            >
              <ClayIcon symbol="search" />
            </ClayButton>
          </ClayManagementToolbar.Item>

          {info && (
            <ClayManagementToolbar.Item>
              <ClayButton
                className="nav-link nav-link-monospaced"
                displayType="unstyled"
              >
                <ClayIcon symbol="info-circle-open" />
              </ClayButton>
            </ClayManagementToolbar.Item>
          )}

          {listType && (
            <ClayManagementToolbar.Item>
              <ClayDropDownWithItems
                items={viewTypes}
                trigger={
                  <ClayButton
                    className="nav-link-monospaced nav-link"
                    displayType="unstyled"
                  >
                    <ClayIcon
                      symbol={viewTypeActive ? viewTypeActive.symbolLeft : ''}
                    />
                  </ClayButton>
                }
              />
            </ClayManagementToolbar.Item>
          )}

          {addButton && (
            <ClayManagementToolbar.Item onClick={addButton}>
              <ClayButtonWithIcon
                className="nav-btn nav-btn-monospaced"
                symbol="plus"
              />
            </ClayManagementToolbar.Item>
          )}
        </ClayManagementToolbar.ItemList>
      </ClayManagementToolbar>

      {searchValue && (
        <ClayResultsBar>
          <ClayResultsBar.Item>
            <span className="component-text text-truncate-inline">
              <span className="text-truncate">
                {i18n.sub('x-results-for-x', [
                  totalItems.toString(),
                  searchValue,
                ])}
              </span>
            </span>
          </ClayResultsBar.Item>

          <ClayResultsBar.Item>
            <ClayButton
              onClick={() => onClickSearch('')}
              className="component-link tbar-link"
              displayType="unstyled"
            >
              {i18n.get('clear')}
            </ClayButton>
          </ClayResultsBar.Item>
        </ClayResultsBar>
      )}
    </>
  );
};

export default ManagementToolbar;
