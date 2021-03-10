import { createContext, Dispatch } from 'react';

import {
  SkillManagement,
  SkillManagementReducer,
  SkillManagementState,
} from './SkillReducer';

type Action = {
  payload?: any;
  type: string;
};

type InitialStateType = SkillManagement;

const initialState = SkillManagementState;

const SkillContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<Action>;
}>({
  dispatch: () => null,
  state: initialState,
});

const mainReducer = (
  state: InitialStateType,
  action: Action,
): InitialStateType => SkillManagementReducer(state, action);

export { mainReducer, initialState };
export default SkillContext;
