import React from 'react';

import SEO from '../components/meta';
import withAuth from '../hocs/withAuth';
import useLang from '../hooks/useLang';

const Index = () => {
  const i18n = useLang();

  return <SEO title={i18n.sub('app-title-x', 'Dashboard')} />;
};

export default withAuth(Index);
