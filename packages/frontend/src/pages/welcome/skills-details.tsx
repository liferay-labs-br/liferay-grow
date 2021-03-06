import React from 'react';

import WelcomeTmpl from '../../components/welcome/WelcomeTmpl';
import withAuth from '../../hocs/withAuth';

const SkillsDetails: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  return <WelcomeTmpl>{'skills details content...'}</WelcomeTmpl>;
};

export default withAuth(SkillsDetails);
