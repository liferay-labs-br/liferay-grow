import React from 'react';

import Meta from '../components/meta';
import useLang from '../hooks/useLang';
import Layout from './_template';

const Index: React.FC = () => {
  const i18n = useLang();

  return (
    <Layout>
      <Meta title={i18n.sub('app-title-x', 'knowledge-areas')} />
    </Layout>
  );
};

export default Index;
