import React from 'react';

import Meta from '@/components/meta';
import HomeTemplate from '@/components/templates/HomeTemplate';
import useLang from '@/hooks/useLang';

const Index: React.FC = () => {
  const i18n = useLang();

  return (
    <HomeTemplate>
      <Meta title={i18n.sub('app-title-x', 'knowledge-areas')} />
    </HomeTemplate>
  );
};

export default Index;
