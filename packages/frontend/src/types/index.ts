export type BasicQuery = {
  id: string;
  name: string;
};

export type Profile = {
  name?: string;
  github_id?: number;
  avatar_url?: string;
  company?: string;
  created_at?: string;
  email?: string;
  id?: number;
  location?: string;
  github_login?: string;
};

export type UserDetails = {
  id?: string;
  office: Office;
  department: BasicQuery;
  role: BasicQuery;
  teams: Team[];
};

export type GrowMapOfficeInput = {
  officeId: string;
  departmentId: string;
  roleId: string;
  teamsId: string[];
};

export interface KnowledgeMatriz extends BasicQuery {
  matrizLevel?: number;
  description?: string;
}

export interface KnowledgeArea extends BasicQuery {
  skills: Skill[];
}

export interface Summary extends BasicQuery {
  description: string;
  value: number;
}

export type KnowledgeSkill = {
  area: KnowledgeArea;
  description: string;
  id: string;
  knowledgeMatrizAverage: KnowledgeMatrizAverage[];
  mentoringMembers: User[];
  name: string;
  otherMembers: User[];
  slug: string;
  summary: Summary[];
  userGaps: User[];
  userSkills: User[];
};

export type KnowledgeSkillDetails = {
  id: string;
  knowledgeSkillId: string;
  knowledgeMatrizId?: string;
  knowledgeMatriz: KnowledgeMatriz;
  knowledgeSkill: Skill;
  isMentor?: boolean;
};

export type KnowledgeGapsDetails = {
  id: string;
  knowledgeSkillId: string;
  knowledgeSkill: Skill;
};

export type GrowMap = {
  id?: string;
  userDetails: UserDetails;
  knowledgeSkillDetails: KnowledgeSkillDetails[];
  knowledgeGapsDetails: KnowledgeGapsDetails[];
};

export type GrowMapMutationData = {
  knowledgeGapsDetails: SelectedSkills[];
  knowledgeSkillDetails: SelectedSkills[];
  userDetails: GrowMapOfficeInput;
};

export type User = {
  id: string;
  profile: Profile;
  growMap?: GrowMap;
};

export enum Types {
  EDIT_KNOWLEDGE_DATA = 'EDIT_KNOWLEDGE_DATA',
  EDIT_SEARCH = 'EDIT_SEARCH',
  EDIT_SELECTED_SKILLS = 'EDIT_SELECTED_SKILLS',
  SET_GET_STARTED_DATA = 'SET_GET_STARTED_DATA',
  SET_KNOWLEDGE_GAPS_DATA = 'SET_KNOWLEDGE_GAPS_DATA',
  SET_LOGGED_USER = 'SET_LOGGED_USER',
  SET_LOGOUT = 'SET_LOGOUT',
  SET_SKILLS_DATA = 'SET_SKILLS_DATA',
  UPDATE_STEP = 'UPDATE_STEP',
  UPDATE_DATA = 'UPDATE_DATA',
}

export interface IWrappedComponentProps
  extends React.HTMLAttributes<HTMLElement> {
  displayName?: string;
}

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
  [Types.EDIT_SEARCH]: string;
  [Types.EDIT_SELECTED_SKILLS]: SelectedSkills[];
  [Types.EDIT_KNOWLEDGE_DATA]: {
    area: KnowledgeArea[];
    matriz: KnowledgeMatriz[];
  };
  [Types.SET_LOGGED_USER]: {
    token: string;
  };
  [Types.SET_LOGOUT]: string;
  [Types.UPDATE_STEP]: {
    checked: boolean;
    value: string;
  };
  [Types.UPDATE_DATA]: GrowMapMutationData;
};

export type Team = {
  id: string;
  name: string;
  slug: string;
  members: Members;
  knowledgeMatrizAverage: KnowledgeMatrizAverage[];
  knowledgeArea: KnowledgeArea[];
};

export type Office = {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  country: string;
};

export type KnowledgeMatrizAverage = {
  id: string;
  name: string;
  matrizLevelAvg: string;
};

export type Skill = {
  id: string;
  name: string;
  description: string;
  slug?: string;
  knowledgeMatrizAverage: KnowledgeMatrizAverage[];
};

export type SelectedSkills = {
  id?: string;
  knowledgeSkillId: string;
  knowledgeMatrizId?: string;
  isMentor?: boolean;
};

export type SkillManagement = {
  search?: string;
  knowledgeMatrizLevelAllowed?: boolean;
  selectedSkills?: SelectedSkills[];
  unavailableKnowledgeSkills?: SelectedSkills[];
  knowledgeSkills?: Skill[];
  knowledgeArea?: KnowledgeArea[];
  knowledgeMatriz?: KnowledgeMatriz[];
};

export type LoggedUser = {
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
  user?: User;
};

export type ResponseUser = {
  token: string | null;
  loggedUser: LoggedUser;
};

export type Steps = {
  checked: boolean;
  value: string;
}[];

export type Welcome = {
  steps: Steps;
  data: GrowMapMutationData;
};

export type Pagination = {
  currentPage: number;
  endIndex: number;
  endPage: number;
  pageSize: number;
  pages: number[];
  startIndex: number;
  startPage: number;
  totalItems: number;
  totalPages: number;
  nextPage?: number;
};

export type Members = {
  pagination: Pagination;
  rows: User[];
};
