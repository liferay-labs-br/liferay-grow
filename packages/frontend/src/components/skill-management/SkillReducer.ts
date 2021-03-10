import { ActionMap } from '../../reducers';

export type Skill = {
  id: string;
  name: string;
};

type Variables = {
  pageSize: number;
  pageIndex: number;
  search?: {
    name: string;
  };
};

type KnowledgeMatriz = {
  id: string;
  name: string;
};

export enum Types {
  EDIT_SEARCH = 'EDIT_SEARCH',
  EDIT_SKILLS = 'EDIT_SKILLS',
  EDIT_VARIABLES = 'EDIT_VARIABLES',
  EDIT_SELECTED_SKILLS = 'EDIT_SELECTED_SKILLS',
  EDIT_KNOWLEDGE_MATRIZ = 'EDIT_KNOWLEDGE_MATRIZ',
}

export type SkillManagement = {
  search: string;
  selectedSkills: Skill[];
  skills: Skill[];
  pagination: any;
  variables: Variables;
  knowledgeMatriz: KnowledgeMatriz[];
};

type SkillManagementActionPayload = {
  [Types.EDIT_SEARCH]: string;
};

export const SkillManagementState: SkillManagement = {
  knowledgeMatriz: [],
  pagination: null,
  search: '',
  selectedSkills: [],
  skills: [],
  variables: { pageIndex: 1, pageSize: 9 },
};

export type SkillManagementActions = ActionMap<SkillManagementActionPayload>[keyof ActionMap<SkillManagementActionPayload>];

export const SkillManagementReducer = (
  state: SkillManagement,
  action: SkillManagementActions | any,
): SkillManagement => {
  switch (action.type) {
    case Types.EDIT_SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }

    case Types.EDIT_SKILLS: {
      return {
        ...state,
        pagination: action.payload.pagination,
        skills: action.payload.skills,
      };
    }

    case Types.EDIT_VARIABLES: {
      return {
        ...state,
        variables: action.payload,
      };
    }

    case Types.EDIT_SELECTED_SKILLS: {
      return {
        ...state,
        selectedSkills: action.payload,
      };
    }

    case Types.EDIT_KNOWLEDGE_MATRIZ: {
      return {
        ...state,
        knowledgeMatriz: action.payload,
      };
    }

    default:
      return state;
  }
};
