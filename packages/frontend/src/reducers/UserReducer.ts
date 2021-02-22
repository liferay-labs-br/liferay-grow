import { ActionMap } from '.';

interface UserType {
  name: string;
}

export enum Types {
  SET_LOGGED_USER = 'SET_LOGGED_USER',
  SET_LOGOUT = 'SET_LOGOUT',
}

export type User = {
  sudo: string | null;
  token: string | null;
  user: UserType | null;
};

type UserActionsPayload = {
  [Types.SET_LOGGED_USER]: string;
  [Types.SET_LOGOUT]: string;
};

export const userState = {
  token: null,
  user: null,
};

export type UserActions = ActionMap<UserActionsPayload>[keyof ActionMap<UserActionsPayload>];

export const userReducer = (state: User, action: UserActions | any): User => {
  switch (action.type) {
    case Types.SET_LOGGED_USER: {
      const { token } = action.payload;
      return {
        ...state,
        token,
      };
    }

    case Types.SET_LOGOUT: {
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
