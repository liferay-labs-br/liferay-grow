import { useRouter } from 'next/router';
import React from 'react';

import { UserTemplate } from '@/components/templates/ProfileTemplate';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getUserByLogin } from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import { KnowledgeMatriz, User } from '@/types';

type RequestProps = {
  user: User;
  allKnowledgeMatriz: KnowledgeMatriz[];
};

const UserByLogin = () => {
  const {
    query: { login },
  } = useRouter();

  return (
    <WrappedSafeComponent<RequestProps>
      query={getUserByLogin}
      options={{ variables: { login } }}
    >
      {({ data: { allKnowledgeMatriz, user } }) => (
        <UserTemplate me={user} allKnowledgeMatriz={allKnowledgeMatriz} />
      )}
    </WrappedSafeComponent>
  );
};

export default withAuth(UserByLogin);
