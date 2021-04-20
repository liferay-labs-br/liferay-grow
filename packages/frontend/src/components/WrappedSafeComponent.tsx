import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  useQuery,
} from '@apollo/client';
import ClayLoadingIndicator from '@clayui/loading-indicator';
import React from 'react';

type WrappedSafeComponentProps = {
  children: (data: any) => React.ReactElement;
  options?: QueryHookOptions<any, OperationVariables>;
  query: DocumentNode;
};

const WrappedSafeComponent: React.FC<WrappedSafeComponentProps> = ({
  children,
  options,
  query,
}) => {
  const { data, error, loading, refetch, variables } = useQuery(query, options);

  const response = {
    ...data,
    refetch,
    variables,
  };

  try {
    if (error) {
      console.error(error); // eslint-disable-line no-console

      return <div>Sorry, an error occurred.</div>;
    }

    if (loading) {
      return <ClayLoadingIndicator className="mt-4" />;
    }
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  return children(response);
};

export default WrappedSafeComponent;
