import { createContext, Dispatch } from 'react';

import { SkillManagement } from '@/types';

import {
  SkillManagementActions,
  SkillManagementReducer,
  SkillManagementState,
} from './SkillReducer';

type InitialStateSkillManagementType = SkillManagement;

const initialState = SkillManagementState;

const SkillContext = createContext<{
  state: InitialStateSkillManagementType;
  dispatch: Dispatch<SkillManagementActions>;
}>({
  dispatch: () => null,
  state: initialState,
});

const mainReducer = (
  state: InitialStateSkillManagementType,
  action: SkillManagementActions,
): InitialStateSkillManagementType => SkillManagementReducer(state, action);

export { mainReducer, initialState };
export default SkillContext;
