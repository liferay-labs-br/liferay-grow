type KnowledgeMatriz = {
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

export enum Languages {
  pt_BR = 'pt_BR',
  en_US = 'en_US',
}

export enum Types {
  EDIT_KNOWLEDGE_MATRIZ = 'EDIT_KNOWLEDGE_MATRIZ',
  EDIT_LANGUAGE = 'EDIT_LANGUAGE',
  EDIT_SEARCH = 'EDIT_SEARCH',
  EDIT_SELECTED_SKILLS = 'EDIT_SELECTED_SKILLS',
  EDIT_SKILLS = 'EDIT_SKILLS',
  EDIT_VARIABLES = 'EDIT_VARIABLES',
  SET_GET_STARTED_DATA = 'SET_GET_STARTED_DATA',
  SET_KNOWLEDGE_GAPS_DATA = 'SET_KNOWLEDGE_GAPS_DATA',
  SET_LOGGED_USER = 'SET_LOGGED_USER',
  SET_LOGOUT = 'SET_LOGOUT',
  SET_SKILLS_DATA = 'SET_SKILLS_DATA',
  UPDATE_STEP = 'UPDATE_STEP',
}

export interface IWrappedComponentProps
  extends React.HTMLAttributes<HTMLElement> {
  displayName?: string;
}

export type Action = {
  payload: any;
  type: any;
};

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type ActionsPayload = {
  [Types.EDIT_LANGUAGE]: Languages;
  [Types.EDIT_SEARCH]: string;
  [Types.EDIT_SKILLS]: {
    pagination: any;
    skills: Skill[];
  };
  [Types.EDIT_VARIABLES]: Variables;
  [Types.EDIT_SELECTED_SKILLS]: Skill[];
  [Types.EDIT_KNOWLEDGE_MATRIZ]: KnowledgeMatriz[];
  [Types.SET_LOGGED_USER]: {
    token: string;
  };
  [Types.SET_LOGOUT]: string;
  [Types.SET_GET_STARTED_DATA]: string;
  [Types.SET_SKILLS_DATA]: string;
  [Types.SET_KNOWLEDGE_GAPS_DATA]: string;
  [Types.UPDATE_STEP]: {
    checked: boolean;
    value: string;
  };
};

export type allOffice = {
  id: string;
  name: string;
  teams: {
    id: string;
    name: string;
  }[];
}[];

export type allRole = {
  id: string;
  name: string;
}[];

export type Portal = {
  languageId: Languages;
};

export type Skill = {
  id: string;
  name: string;
};

export type SkillManagement = {
  search: string;
  selectedSkills: Skill[];
  skills: Skill[];
  pagination: any;
  variables: Variables;
  knowledgeMatriz: KnowledgeMatriz[];
};

export type User = {
  token: string | null;
  loggedUser: {
    name?: string;
    accountId?: number;
    avatar_url?: string;
    bio?: string;
    company?: string;
    created_at?: string;
    email?: string;
    id?: string;
    location?: string;
    login?: string;
    user?: {
      id: string;
      growMap: {
        id: string;
      } | null;
    };
  };
};
