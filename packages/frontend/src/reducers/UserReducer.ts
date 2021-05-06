import { ActionMap, ActionsPayload, ResponseUser, Types } from '@/types';
import { delToken, getToken, setToken } from '@/utils/cookie';
import { parseJwt } from '@/utils/util';

export type UserActions = ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

export const userState = {
  loggedUser: {},
  token: getToken(),
};

export const userReducer = (
  state: ResponseUser,
  action: UserActions,
): ResponseUser => {
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
