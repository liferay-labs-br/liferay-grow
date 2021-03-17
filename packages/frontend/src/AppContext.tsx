import { createContext, Dispatch } from 'react';

import { userReducer, userState } from './reducers/UserReducer';
import { welcomeReducer, welcomeState } from './reducers/WelcomeReducer';
import { Action, User, Welcome } from './types';

type InitialStateAppContextType = {
  user: User;
  welcome: Welcome;
};

const initialState = {
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
  { user, welcome }: InitialStateAppContextType,
  action: Action,
): InitialStateAppContextType => ({
  user: userReducer(user, action),
  welcome: welcomeReducer(welcome, action),
});

export { mainReducer, initialState };
export default AppContext;
