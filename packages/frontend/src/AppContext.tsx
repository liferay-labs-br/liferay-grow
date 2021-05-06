import { createContext, Dispatch } from 'react';

import { UserActions, userReducer, userState } from './reducers/UserReducer';
import { welcomeReducer, welcomeState } from './reducers/WelcomeReducer';
import { ResponseUser, Welcome } from './types';

type InitialStateAppContextType = {
  user: ResponseUser;
  welcome: Welcome;
};

const initialState = {
  user: userState,
  welcome: welcomeState,
};

const AppContext = createContext<{
  state: InitialStateAppContextType;
  dispatch: Dispatch<UserActions>;
}>({
  dispatch: () => null,
  state: initialState,
});

const mainReducer = (
  { user, welcome }: InitialStateAppContextType,
  action: UserActions,
): InitialStateAppContextType => ({
  user: userReducer(user, action),
  welcome: welcomeReducer(welcome, action),
});

export { mainReducer, initialState };
export default AppContext;
