import { OperationVariables, QueryHookOptions, useQuery } from '@apollo/client';
import ClayLoadingIndicator from '@clayui/loading-indicator';
import React from 'react';

interface IWrappedSafeComponentProps extends React.HTMLAttributes<HTMLElement> {
  children: (data: any) => React.ReactElement;
  options?: QueryHookOptions<any, OperationVariables>;
  query: any;
}

const WrappedSafeComponent: React.FC<IWrappedSafeComponentProps> = ({
  children,
  options,
  query,
}) => {
  const { data, error, loading } = useQuery(query, options);

  try {
    if (error) {
      console.error(error); // eslint-disable-line no-console

      return <div>Sorry, an error occurred.</div>;
    }

    if (loading) {
      return <ClayLoadingIndicator />;
    }
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  return children(data);
};

export default WrappedSafeComponent;
