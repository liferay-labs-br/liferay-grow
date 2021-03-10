import React, { useEffect, useReducer } from 'react';

import { initializeApollo } from '../../graphql/nextApollo';
import {
  allKnowledgeMatriz,
  allKnowledgeSkillsPaginate,
} from '../../graphql/queries';
import useDebounce from '../../hooks/useDebounce';
import SkillContext, { initialState, mainReducer } from './SkillContext';
import { Types } from './SkillReducer';

const DEBOUNCE_TIMER = 200;

const AppProvider: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  const client = initializeApollo();
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const debouncedValue = useDebounce(state.search, DEBOUNCE_TIMER);

  const fetchKnowledgeSkillsPaginate = async () => {
    const { data } = await client.query({
      query: allKnowledgeSkillsPaginate,
      variables: { data: state.variables },
    });

    dispatch({
      payload: {
        pagination: data.skillsPaginate.pagination,
        skills: data.skillsPaginate.rows,
      },
      type: Types.EDIT_SKILLS,
    });
  };

  const fetchKnowledgeMatriz = async () => {
    const { data } = await client.query({
      query: allKnowledgeMatriz,
    });

    dispatch({
      payload: data.matriz,
      type: Types.EDIT_KNOWLEDGE_MATRIZ,
    });
  };

  useEffect(() => {
    dispatch({
      payload: {
        ...state.variables,
        search: {
          name: `${debouncedValue}%`,
        },
      },
      type: Types.EDIT_VARIABLES,
    });
  }, [debouncedValue]);

  useEffect(() => {
    fetchKnowledgeSkillsPaginate();
  }, [state.variables]);

  useEffect(() => {
    fetchKnowledgeMatriz();
  }, []);

  return (
    <SkillContext.Provider value={{ dispatch, state }}>
      {children}
    </SkillContext.Provider>
  );
};

export default AppProvider;
