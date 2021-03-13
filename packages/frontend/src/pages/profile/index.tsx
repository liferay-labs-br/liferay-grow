import React from 'react';

import WrappedSafeComponent from '../../components/WrappedSafeComponent';
import { getMe } from '../../graphql/queries';
import withAuth from '../../hocs/withAuth';
import { KnowledgeMatriz, Me } from '../../types';
import { UserTemplate } from './_template';

type RequestProps = {
  allKnowledgeMatriz: KnowledgeMatriz[];
  me: Me;
};

const Profile = () => (
  <WrappedSafeComponent query={getMe}>
    {({ allKnowledgeMatriz, me }: RequestProps) => (
      <UserTemplate me={me} allKnowledgeMatriz={allKnowledgeMatriz} />
    )}
  </WrappedSafeComponent>
);

export default withAuth(Profile);
