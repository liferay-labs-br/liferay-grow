import { delToken, setToken } from '../utils/cookie';
import { parseJwt } from '../utils/util';
import { ActionMap } from '.';

interface UserType {
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
}

export enum Types {
  SET_LOGGED_USER = 'SET_LOGGED_USER',
  SET_LOGOUT = 'SET_LOGOUT',
}

export type User = {
  token: string | null;
  loggedUser: UserType;
};

type UserActionsPayload = {
  [Types.SET_LOGGED_USER]: string;
  [Types.SET_LOGOUT]: string;
};

export const userState = {
  loggedUser: {},
  token: null,
};

export type UserActions = ActionMap<UserActionsPayload>[keyof ActionMap<UserActionsPayload>];

export const userReducer = (state: User, action: UserActions | any): User => {
  switch (action.type) {
    case Types.SET_LOGGED_USER: {
      const { token } = action.payload;

      setToken(token);

      return {
        ...state,
        loggedUser: parseJwt(token),
        token,
      };
    }

    case Types.SET_LOGOUT: {
      delToken();

      return {
        ...state,
        loggedUser: null,
        token: null,
      };
    }

    default:
      return state;
  }
};
