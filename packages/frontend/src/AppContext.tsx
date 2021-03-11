import { createContext, Dispatch } from 'react';

import { portalReducer, portalState } from './reducers/PortalReducer';
import { userReducer, userState } from './reducers/UserReducer';
import { welcomeReducer, welcomeState } from './reducers/WelcomeReducer';

const initialState = {
  portal: portalState,
  user: userState,
  welcome: welcomeState,
};

const AppContext = createContext<{
  state: InitialStateAppContextType;
  dispatch: Dispatch<Action>;
}>({
  dispatch: () => null,
  state: initialState,
});

const mainReducer = (
  { portal, user, welcome }: InitialStateAppContextType,
  action: Action,
): InitialStateAppContextType => ({
  portal: portalReducer(portal, action),
  user: userReducer(user, action),
  welcome: welcomeReducer(welcome, action),
});

export { mainReducer, initialState };
export default AppContext;
