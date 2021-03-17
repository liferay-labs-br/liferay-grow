import React, { useEffect, useReducer } from 'react';

import AppContext, { initialState, mainReducer } from './AppContext';
import { Types } from './types';
import { getToken } from './utils/cookie';

const AppProvider: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    const token = getToken();

    if (token) {
      dispatch({
        payload: { token },
        type: Types.SET_LOGGED_USER,
      });
    }
  }, []);

  return (
    <AppContext.Provider value={{ dispatch, state }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
