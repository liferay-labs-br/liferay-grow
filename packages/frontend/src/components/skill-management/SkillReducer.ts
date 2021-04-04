import {
  ActionMap,
  ActionsPayload,
  KnowledgeArea,
  SkillManagement,
  Types,
} from '@/types';
import { flat } from '@/utils/util';

type SkillManagementActions = ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

export const SkillManagementState: SkillManagement = {
  knowledgeArea: [],
  knowledgeMatriz: [],
  knowledgeMatrizLevelAllowed: true,
  knowledgeSkills: [],
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

      const knowledgeArea: KnowledgeArea[] = action.payload.area.map(
        (area) => ({
          ...area,
          skills: [...area.skills].filter(
            ({ id }) => !unavailableKnowledgeSkillsIds.includes(id),
          ),
        }),
      );

      const knowledgeSkills = flat(knowledgeArea.map(({ skills }) => skills));

      return {
        ...state,
        knowledgeArea,
        knowledgeMatriz: action.payload.matriz || state.knowledgeMatriz,
        knowledgeSkills,
      };
    }

    default:
      return state;
  }
};
