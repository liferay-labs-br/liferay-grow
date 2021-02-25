import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useReducer } from 'react';

import GapsContext, { initialState, mainReducer } from './GapsContext';
import { Types } from './reducer/main-reducer';

type GapsContextProviderProps = {
  children: React.ReactElement;
};

const query = gql`
  query {
    getAllOffice {
      id
      name
      teams {
        id
        name
      }
    }

    getAllCareerDepartament {
      id
      name
      careers {
        id
        name
      }
    }
  }
`;

const GapsContextProvider = ({
  children,
}: GapsContextProviderProps): React.ReactElement => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  const { data } = useQuery(query);

  useEffect(() => {
    if (data) {
      dispatch({ payload: data.getAllOffice, type: Types.EDIT_OFFICES });
      dispatch({
        payload: data.getAllCareerDepartament,
        type: Types.EDIT_CAREERS,
      });
    }
  }, [data]);

  return (
    <GapsContext.Provider value={{ dispatch, state }}>
      {children}
    </GapsContext.Provider>
  );
};

export default GapsContextProvider;
