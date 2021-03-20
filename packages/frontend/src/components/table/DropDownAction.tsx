import ClayDropDown from '@clayui/drop-down';
import React from 'react';

type NameFn = (item: string) => React.ReactNode;

interface IDropDownAction extends React.HTMLAttributes<HTMLElement> {
  item: string;
  setActive(value: boolean): void;
  action: {
    action: (item: string) => void;
    name: string | NameFn;
  };
}

const { Divider, Item } = ClayDropDown;

const DropDownAction: React.FC<IDropDownAction> = ({
  action: { action, name },
  item,
  setActive,
}) => {
  if (name === 'divider') {
    return <Divider />;
  }

  return (
    <Item
      onClick={(event) => {
        event.preventDefault();
        setActive(false);

        if (action) {
          action(item);
        }
      }}
    >
      {typeof name === 'function' ? name(item) : name}
    </Item>
  );
};

export default DropDownAction;
