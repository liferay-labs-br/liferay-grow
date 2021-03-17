import { ActionMap, ActionsPayload, Types, User } from '@/types';
import { delToken, getToken, setToken } from '@/utils/cookie';
import { parseJwt } from '@/utils/util';

type UserActions = ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

export const userState = {
  loggedUser: {},
  token: getToken(),
};

export const userReducer = (state: User, action: UserActions): User => {
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
