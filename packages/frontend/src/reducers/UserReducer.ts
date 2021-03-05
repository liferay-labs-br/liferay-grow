import { delToken, setToken } from '../utils/cookie';
import { parseJwt } from '../utils/util';
import { ActionMap } from '.';

interface UserType {
  name: string;
  accountId: number;
  avatar_url: string;
  bio: string;
  company: string;
  created_at: string;
  email: string;
  id: string;
  location: string;
  login: string;
  user: {
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
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: UserType | {}; // This empty object should be replaced soon
};

type UserActionsPayload = {
  [Types.SET_LOGGED_USER]: string;
  [Types.SET_LOGOUT]: string;
};

export const userState = {
  token: null,
  user: {},
};

export type UserActions = ActionMap<UserActionsPayload>[keyof ActionMap<UserActionsPayload>];

export const userReducer = (state: User, action: UserActions | any): User => {
  switch (action.type) {
    case Types.SET_LOGGED_USER: {
      const { token } = action.payload;

      setToken(token);

      return {
        ...state,
        token,
        user: parseJwt(token),
      };
    }

    case Types.SET_LOGOUT: {
      delToken();

      return {
        ...state,
        token: null,
        user: null,
      };
    }

    default:
      return state;
  }
};
