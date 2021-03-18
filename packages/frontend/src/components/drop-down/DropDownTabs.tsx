import ClayDropDown, { Align } from '@clayui/drop-down';
import ClayIcon from '@clayui/icon';
import ClayTabs from '@clayui/tabs';
import React, { useState } from 'react';

import useLang from '@/hooks/useLang';

type Tab = {
  disabled?: boolean;
  id: string;
  label: string;
};

type ClayDropDownWithTabsProps = {
  tabs: Tab[];
  offset: number;
  onClick?: (tab: Tab) => void;
};

const DropDownWithState = ({ children, trigger, ...others }) => {
  const [active, setActive] = useState(false);

  return (
    <ClayDropDown
      active={active}
      alignmentPosition={Align.BottomLeft}
      hasRightSymbols
      onActiveChange={(newVal) => setActive(newVal)}
      trigger={trigger}
      {...others}
    >
      {children}
    </ClayDropDown>
  );
};

const ClayDropDownWithTabs: React.FC<ClayDropDownWithTabsProps> = ({
  tabs = [],
  children,
  offset,
  onClick,
}) => {
  const [activeTabKeyValue, setActiveTabKeyValue] = useState(0);
  const i18n = useLang();

  const dropdownTabsItems = tabs
    .slice(offset)
    .map(({ label, ...tab }, index) => ({
      ...tab,
      label,
      tabkey: offset + index,
    }));

  const onClickTab = (index, tab) => {
    setActiveTabKeyValue(index);
    onClick(tab);
  };

  return (
    <>
      <ClayTabs modern>
        {tabs.slice(0, offset).map((tab, index) => (
          <ClayTabs.Item
            key={index}
            active={activeTabKeyValue === index}
            innerProps={{
              'aria-controls': `tabpanel-${index + 1}`,
            }}
            onClick={() => onClickTab(index, tab)}
          >
            {tab.label}
          </ClayTabs.Item>
        ))}

        {tabs.length > offset && (
          <DropDownWithState
            trigger={
              <ClayTabs.Item
                active={dropdownTabsItems
                  .map(({ tabkey }) => tabkey)
                  .includes(activeTabKeyValue)}
                innerProps={{
                  'aria-controls': 'tabpanel-5',
                }}
                onClick={() => setActiveTabKeyValue(4)}
              >
                {i18n.get('other')}
                <ClayIcon symbol="caret-bottom" />
              </ClayTabs.Item>
            }
          >
            <ClayDropDown.ItemList>
              {dropdownTabsItems.map((tab, i) => {
                const { disabled = false, label, tabkey } = tab;

                return (
                  <ClayDropDown.Item
                    active={activeTabKeyValue === tabkey}
                    aria-selected={activeTabKeyValue === tabkey}
                    disabled={disabled}
                    key={i}
                    onClick={() => onClickTab(tabkey, tab)}
                    role="tab"
                    symbolRight={
                      activeTabKeyValue === tabkey ? 'check' : undefined
                    }
                  >
                    {label}
                  </ClayDropDown.Item>
                );
              })}
            </ClayDropDown.ItemList>
          </DropDownWithState>
        )}
      </ClayTabs>
      <ClayTabs.Content className="mt-4" activeIndex={activeTabKeyValue} fade>
        {tabs.map((tab, index) => (
          <ClayTabs.TabPane key={tab.id} aria-labelledby={`tab-${index + 1}`}>
            {children}
          </ClayTabs.TabPane>
        ))}
      </ClayTabs.Content>
    </>
  );
};

export default ClayDropDownWithTabs;
