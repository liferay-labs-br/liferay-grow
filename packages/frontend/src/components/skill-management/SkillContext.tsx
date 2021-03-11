import { createContext, Dispatch } from 'react';

import { SkillManagementReducer, SkillManagementState } from './SkillReducer';

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
