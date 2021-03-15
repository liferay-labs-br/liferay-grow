import { ActionMap, ActionsPayload, SkillManagement, Types } from '../../types';

type SkillManagementActions = ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

export const SkillManagementState: SkillManagement = {
  knowledgeArea: [],
  knowledgeMatriz: [],
  knowledgeMatrizLevelAllowed: true,
  search: '',
  selectedSkills: [],
  unavailableKnowledgeSkills: [],
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
      const unavailableKnowledgeSkillsIds = state.unavailableKnowledgeSkills.map(
        ({ knowledgeSkillId }) => knowledgeSkillId,
      );

      return {
        ...state,
        knowledgeArea: action.payload.area.map((area) => ({
          ...area,
          skills: [...area.skills].filter(
            ({ id }) => !unavailableKnowledgeSkillsIds.includes(id),
          ),
        })),
        knowledgeMatriz: action.payload.matriz,
      };
    }

    default:
      return state;
  }
};
