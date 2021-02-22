import { createContext, Dispatch } from 'react';

import { Portal, portalReducer, portalState } from './reducers/PortalReducer';
import { User, userReducer, userState } from './reducers/UserReducer';

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
  dispatch: Dispatch<any>;
}>({
  dispatch: () => {},
  state: initialState,
});

const mainReducer = ({ portal, user }: InitialStateType, action: any) => ({
  portal: portalReducer(portal, action),
  user: userReducer(user, action),
});

export { mainReducer, initialState };
export default AppContext;
