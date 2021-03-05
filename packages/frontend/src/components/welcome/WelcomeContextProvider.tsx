import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useReducer } from 'react';

import { Types } from './reducer/main-reducer';
import WelcomeContext, { initialState, mainReducer } from './WelcomeContext';

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

    getAllRole {
      id
      name
    }
  }
`;

const WelcomeContextProvider: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
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
    <WelcomeContext.Provider value={{ dispatch, state }}>
      {children}
    </WelcomeContext.Provider>
  );
};

export default WelcomeContextProvider;
