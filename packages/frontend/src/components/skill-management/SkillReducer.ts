import { ActionMap, ActionsPayload, SkillManagement, Types } from '../../types';

type SkillManagementActions = ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

export const SkillManagementState: SkillManagement = {
  knowledgeArea: [],
  knowledgeMatriz: [],
  knowledgeMatrizLevelAllowed: true,
  search: '',
  selectedSkills: [],
};

export const SkillManagementReducer = (
  state: SkillManagement,
  action: SkillManagementActions,
): SkillManagement => {
  switch (action.type) {
    case Types.EDIT_SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }

    case Types.EDIT_SELECTED_SKILLS: {
      return {
        ...state,
        selectedSkills: action.payload,
      };
    }

    case Types.EDIT_KNOWLEDGE_DATA: {
      return {
        ...state,
        knowledgeArea: action.payload.area,
        knowledgeMatriz: action.payload.matriz,
      };
    }

    default:
      return state;
  }
};
