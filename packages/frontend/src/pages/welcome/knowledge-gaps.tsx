import React from 'react';

import WelcomeTmpl from '../../components/welcome/WelcomeTmpl';
import withAuth from '../../hocs/withAuth';

const KnowledgeGaps: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  return <WelcomeTmpl>{'Knowledge gaps content...'}</WelcomeTmpl>;
};

export default withAuth(KnowledgeGaps);
