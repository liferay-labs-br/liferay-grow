import { useRouter } from 'next/router';
import React from 'react';

import SEO from '../components/meta';
import withAuth from '../hocs/withAuth';
import useLang from '../hooks/useLang';

const Index = () => {
  const i18n = useLang();
  const router = useRouter();

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
      <button type="button" onClick={() => router.push('/welcome')}>
        Some Dashboard
      </button>
    </div>
  );
};

export default withAuth(Index);
