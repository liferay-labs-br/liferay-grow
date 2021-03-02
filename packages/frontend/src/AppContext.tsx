import { createContext, Dispatch } from 'react';

import { Portal, portalReducer, portalState } from './reducers/PortalReducer';
import { User, userReducer, userState } from './reducers/UserReducer';

type Action = {
  payload: {
    token: string;
  };
  type: string;
};

type InitialStateType = {
  portal: Portal;
  user: User;
};

const initialState = {
  portal: portalState,
  user: userState,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<Action>;
}>({
  dispatch: () => null,
  state: initialState,
});

const mainReducer = (
  { portal, user }: InitialStateType,
  action: Action,
): InitialStateType => ({
  portal: portalReducer(portal, action),
  user: userReducer(user, action),
});

export { mainReducer, initialState };
export default AppContext;
