import ClayLayout from '@clayui/layout';
import React from 'react';

import { GapsContent, GapsHeader, GapsSidebar } from '../../components/Gaps';
import SEO from '../../components/SEO';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';

const Gaps = (): React.ReactElement => {
  const i18n = useLang();

  return (
    <ClayLayout.ContainerFluid className="gaps">
      <SEO title={i18n.sub('app-title-x', 'gaps')} />
      <ClayLayout.Row>
        <ClayLayout.Col size={4}>
          <GapsSidebar />
        </ClayLayout.Col>
        <ClayLayout.Col>
          <GapsHeader />
          <hr />
          <GapsContent />
        </ClayLayout.Col>
      </ClayLayout.Row>
    </ClayLayout.ContainerFluid>
  );
};

export default withAuth(Gaps);
