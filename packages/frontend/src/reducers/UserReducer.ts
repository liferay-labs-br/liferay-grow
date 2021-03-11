import { delToken, setToken } from '../utils/cookie';
import { parseJwt } from '../utils/util';

export const userState = {
  loggedUser: {},
  token: null,
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
