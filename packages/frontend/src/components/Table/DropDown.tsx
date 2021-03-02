import Button from '@clayui/button';
import ClayDropDown, { Align } from '@clayui/drop-down';
import ClayIcon from '@clayui/icon';
import { ClayTooltipProvider } from '@clayui/tooltip';
import React, { cloneElement, useState } from 'react';

import DropDownAction from './DropDownAction';

const { ItemList } = ClayDropDown;

interface IDropDown extends React.HTMLAttributes<HTMLElement> {
  actions: Array<any>;
  item: any;
  noActionsMessage?: string;
}

const Component: React.FC<IDropDown> = ({
  actions = [],
  item,
  noActionsMessage,
}) => {
  const [active, setActive] = useState(false);

  const DropdownButton = (
    <Button className="page-link" displayType="unstyled">
      <ClayIcon symbol="ellipsis-v" />
    </Button>
  );

  actions = actions.filter((action) =>
    action.show ? action.show(item) : true,
  );

  if (actions.length === 0) {
    return (
      <ClayTooltipProvider>
        {cloneElement(DropdownButton, {
          'data-tooltip-align': 'bottom',
          'data-tooltip-delay': '200',
          disabled: true,
          title: noActionsMessage,
        })}
      </ClayTooltipProvider>
    );
  }

  return (
    <ClayDropDown
      active={active}
      alignmentPosition={Align.RightCenter}
      className="dropdown-action"
      onActiveChange={(newVal) => setActive(newVal)}
      trigger={DropdownButton}
    >
      <ItemList>
        {actions.map((action, index) => (
          <DropDownAction
            action={action}
            item={item}
            key={index}
            setActive={setActive}
          />
        ))}
      </ItemList>
    </ClayDropDown>
  );
};

export default Component;
