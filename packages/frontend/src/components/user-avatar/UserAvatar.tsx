import ClayDropDown from '@clayui/drop-down';
import React, { useState } from 'react';

const UserAvatar = () => {
  const [active, setActive] = useState(false);

  return (
    <ClayDropDown
      trigger={
        <img
          className="user-avatar"
          src={'https://github.com/kevenleone.png'}
          alt="user-avatar"
        ></img>
      }
      active={active}
      onActiveChange={setActive}
    >
      <ClayDropDown.Help>{'Can I help you?'}</ClayDropDown.Help>
      <ClayDropDown.ItemList>
        <ClayDropDown.Group header="Settings">
          <ClayDropDown.Item>Sair</ClayDropDown.Item>
        </ClayDropDown.Group>
      </ClayDropDown.ItemList>
    </ClayDropDown>
  );
};

export default UserAvatar;
