import ClayLayout from '@clayui/layout';
import React from 'react';

import { GapsContent, GapsHeader, GapsSidebar } from '../../components/Gaps';

export default function Gaps (): React.ReactElement {
  return (
    <ClayLayout.ContainerFluid className="gaps">
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
}
