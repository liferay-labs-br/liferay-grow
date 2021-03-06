import { createContext, Dispatch } from 'react';

import {
  Main,
  mainReducer as mainStateReducer,
  mainState,
} from './reducer/main-reducer';
import { GetStarted, startReducer, startState } from './reducer/start-reducer';

type Action = {
  payload: any;
  type: string;
};

type InitialStateType = {
  getStarted: GetStarted;
  main: Main;
};

const initialState = {
  getStarted: startState,
  main: mainState,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({
  dispatch: () => null,
  state: initialState,
});

const mainReducer = (
  { getStarted, main }: InitialStateType,
  action: Action,
): any => ({
  getStarted: startReducer(getStarted, action),
  main: mainStateReducer(main, action),
});

export { mainReducer, initialState };
export default AppContext;
