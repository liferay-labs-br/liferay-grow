import { useRouter } from 'next/router';
import React from 'react';

import { UserTemplate } from '../_template';
import WrappedSafeComponent from '../../../components/WrappedSafeComponent';
import { getUserByLogin } from '../../../graphql/queries';
import withAuth from '../../../hocs/withAuth';
import { KnowledgeMatriz, Me } from '../../../types';

type RequestProps = {
  allKnowledgeMatriz: KnowledgeMatriz[];
  user: Me;
};

const UserByLogin = () => {
  const {
    query: { login },
  } = useRouter();

  return (
    <WrappedSafeComponent
      query={getUserByLogin}
      options={{ variables: { login } }}
    >
      {({ allKnowledgeMatriz, user }: RequestProps) => (
        <UserTemplate me={user} allKnowledgeMatriz={allKnowledgeMatriz} />
      )}
    </WrappedSafeComponent>
  );
};

export default withAuth(UserByLogin);
