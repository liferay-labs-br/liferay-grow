import {
  ApolloQueryResult,
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  useQuery,
} from '@apollo/client';
import ClayLoadingIndicator from '@clayui/loading-indicator';
import React from 'react';

type Response<T> = {
  data: T;
  refetch: (
    variables?: Partial<OperationVariables>,
  ) => Promise<ApolloQueryResult<T>>;
  variables: any;
};

type WrappedSafeComponentProps<T> = {
  children: (data: Response<T>) => React.ReactElement;
  options?: QueryHookOptions<OperationVariables>;
  query: DocumentNode;
};

const WrappedSafeComponent = <T,>({
  children,
  options,
  query,
}: WrappedSafeComponentProps<T>): React.ReactElement => {
  const { data, error, loading, refetch, variables } = useQuery<T>(
    query,
    options,
  );

  const response: Response<T> = {
    data,
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
