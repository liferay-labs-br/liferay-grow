import React from 'react';

import SEO from '../components/SEO';
import withAuth from '../hocs/withAuth';
import useLang from '../hooks/useLang';

const Index = () => {
  const i18n = useLang();

  return (
    <div
      style={{
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <SEO title={i18n.sub('app-title-x', 'Dashboard')} />
      Some Dashboard
    </div>
  );
};

export default withAuth(Index);
