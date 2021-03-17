import ClayDropDown from '@clayui/drop-down';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';

import AppContext from '@/AppContext';
import useLang from '@/hooks/useLang';
import { Types } from '@/types';

const UserAvatar: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const [active, setActive] = useState(false);
  const {
    dispatch,
    state: {
      user: { loggedUser },
    },
  } = useContext(AppContext);

  const { avatar_url, name } = loggedUser || {};

  const i18n = useLang();
  const router = useRouter();

  const redirectTo = (path: string) => {
    setActive(false);
    router.push(path);
  };

  const onLogout = () => {
    dispatch({ payload: null, type: Types.SET_LOGOUT });
    redirectTo('/auth');
  };

  if (avatar_url) {
    return (
      <ClayDropDown
        trigger={
          <img
            className="user-avatar"
            src={avatar_url}
            alt={`User ${name} profile image`}
          />
        }
        active={active}
        onActiveChange={setActive}
      >
        <ClayDropDown.Help>{i18n.sub('welcome-x', name)}</ClayDropDown.Help>
        <ClayDropDown.ItemList>
          <ClayDropDown.Item onClick={() => redirectTo('/profile')}>
            {i18n.get('profile')}
          </ClayDropDown.Item>
          <ClayDropDown.Item onClick={onLogout}>
            {i18n.get('logout')}
          </ClayDropDown.Item>
        </ClayDropDown.ItemList>
      </ClayDropDown>
    );
  } else {
    return <></>;
  }
};

export default UserAvatar;
