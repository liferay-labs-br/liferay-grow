import React, { useEffect, useReducer } from 'react';

import { initializeApollo } from '@/graphql/nextApollo';
import { allKnowledgeData } from '@/graphql/queries';
import { SkillManagement, Types } from '@/types';

import SkillContext, { initialState, mainReducer } from './SkillContext';

type AppProvider = {
  defaultState?: SkillManagement;
  fetchData?: boolean;
};

const AppProvider: React.FC<AppProvider> = ({
  children,
  fetchData = true,
  defaultState = {},
}) => {
  const client = initializeApollo(null, true);
  const [state, dispatch] = useReducer(mainReducer, {
    ...initialState,
    ...defaultState,
  });

  const fetchKnowledgeData = async () => {
    const { data } = await client.query({
      query: allKnowledgeData,
    });

    dispatch({
      payload: data,
      type: Types.EDIT_KNOWLEDGE_DATA,
    });
  };

  useEffect(() => {
    if (fetchData) {
      fetchKnowledgeData();
    }
  }, []);

  return (
    <SkillContext.Provider value={{ dispatch, state }}>
      {children}
    </SkillContext.Provider>
  );
};

export default AppProvider;
