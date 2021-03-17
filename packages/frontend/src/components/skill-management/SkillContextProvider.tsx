import React, { useEffect, useReducer } from 'react';

import { initializeApollo } from '@/graphql/nextApollo';
import { allKnowledgeData } from '@/graphql/queries';
import { SkillManagement, Types } from '@/types';

import SkillContext, { initialState, mainReducer } from './SkillContext';

type AppProvider = {
  defaultState?: SkillManagement;
};

const AppProvider: React.FC<AppProvider> = ({
  children,
  defaultState = {},
}) => {
  const client = initializeApollo();
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
    fetchKnowledgeData();
  }, []);

  return (
    <SkillContext.Provider value={{ dispatch, state }}>
      {children}
    </SkillContext.Provider>
  );
};

export default AppProvider;
