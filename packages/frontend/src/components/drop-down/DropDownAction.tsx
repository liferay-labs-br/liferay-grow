import ClayDropDown from '@clayui/drop-down';
import React from 'react';

type ActionProps<T> = {
  action: (item: T) => void;
  name: string | ((item: T) => React.ReactNode);
};

interface IDropDownAction<T> extends React.HTMLAttributes<HTMLElement> {
  item: T;
  setActive(value: boolean): void;
  action: ActionProps<T>;
}

const { Divider, Item } = ClayDropDown;

const DropDownAction = <T,>({
  action: { action, name },
  item,
  setActive,
}: IDropDownAction<T>): React.ReactElement => {
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
