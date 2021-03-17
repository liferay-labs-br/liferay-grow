import { createContext, Dispatch } from 'react';

import { Action, SkillManagement } from '@/types';

import { SkillManagementReducer, SkillManagementState } from './SkillReducer';

type InitialStateSkillManagementType = SkillManagement;

const initialState = SkillManagementState;

const SkillContext = createContext<{
  state: InitialStateSkillManagementType;
  dispatch: Dispatch<Action>;
}>({
  dispatch: () => null,
  state: initialState,
});

const mainReducer = (
  state: InitialStateSkillManagementType,
  action: Action,
): InitialStateSkillManagementType => SkillManagementReducer(state, action);

export { mainReducer, initialState };
export default SkillContext;
