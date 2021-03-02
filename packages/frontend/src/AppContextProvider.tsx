import React, { useEffect, useReducer } from 'react';

import AppContext, { initialState, mainReducer } from './AppContext';
import { LANGUAGE_KEY, Languages } from './reducers/PortalReducer';
import { Types } from './reducers/UserReducer';
import { keys } from './utils/util';

const AppProvider: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    const { language } = navigator;

    const mapLanguages = {
      en: Languages.en_US,
      'en-US': Languages.en_US,
      pt: Languages.pt_BR,
      'pt-BR': Languages.pt_BR,
    };

    const getLanguageValue =
      localStorage.getItem(LANGUAGE_KEY) || mapLanguages[language];

    dispatch({ payload: getLanguageValue, type: 'EDIT_LANGUAGE' });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(keys.token);

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
