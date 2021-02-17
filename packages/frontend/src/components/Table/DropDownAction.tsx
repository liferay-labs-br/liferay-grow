import ClayDropDown from '@clayui/drop-down';
import React from 'react';

const { Divider, Item } = ClayDropDown;

interface IDropDownAction {
  item: any;
  setActive(param: any): any;
  action: {
    action(param: any): any;
    name: string | Function;
  };
}

const DropDownAction = ({
  action: { action, name },
  item,
  setActive,
}: IDropDownAction): React.ReactElement => {
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
