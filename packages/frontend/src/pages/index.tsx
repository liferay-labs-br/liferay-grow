import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import SEO from '../components/meta';
import withAuth from '../hocs/withAuth';
import useLang from '../hooks/useLang';

const Index = () => {
  const i18n = useLang();
  const router = useRouter();

  useEffect(() => {
    router.push('/welcome');
  }, []);

  return <SEO title={i18n.sub('app-title-x', 'Dashboard')} />;
};

export default withAuth(Index);
