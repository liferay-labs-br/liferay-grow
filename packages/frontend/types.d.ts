enum Languages {
  pt_BR = 'pt_BR',
  en_US = 'en_US',
}

enum Types {
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

type Action = {
  payload: any;
  type: any;
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type ActionsPayload = {
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

type allOffice = {
  id: string;
  name: string;
  teams: {
    id: string;
    name: string;
  }[];
}[];

type allRole = {
  id: string;
  name: string;
}[];

type InitialStateAppContextType = {
  portal: Portal;
  user: User;
  welcome: Welcome;
};

type InitialStateSkillManagementType = SkillManagement;

type KnowledgeMatriz = {
  id: string;
  name: string;
};

type NameFn = (item: string) => React.ReactNode;

type Portal = {
  languageId: Languages;
};

type PortalActions = ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

type PortalActionPayload = {
  [Types.EDIT_LANGUAGE]: Languages;
};

type Size = 'full-screen' | 'lg' | 'sm';

type SkillInfoProps = {
  onClick: (skill: Skill) => void;
  skill: Skill;
};

type SkillListProps = {
  onClick: (skill: Skill) => void;
  filteredSkills: Skill[];
  loading?: boolean;
};

type SkillFooterProps = {
  filteredSkills: Skill[];
  handleMoreSkills: () => void;
};

type SkillResultsFooter = {
  filteredSkills: Skill[];
};

type Skill = {
  id: string;
  name: string;
};

type SkillManagement = {
  search: string;
  selectedSkills: Skill[];
  skills: Skill[];
  pagination: any;
  variables: Variables;
  knowledgeMatriz: KnowledgeMatriz[];
};

type SkillManagementActions = ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

type Steps = {
  checked: boolean;
  value: string;
}[];

type UserActions = ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

type User = {
  token: string | null;
  loggedUser: UserType;
};

type UserType = {
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

type Variables = {
  pageSize: number;
  pageIndex: number;
  search?: {
    name: string;
  };
};

type Welcome = {
  steps: Steps;
};

type WelcomeActions = ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];
