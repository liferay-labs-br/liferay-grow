import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import React from 'react';

import Sidebar from '@/components/sidebar/Sidebar';

const steps = [
  {
    name: 'knowledge-areas',
    path: '/',
    symbol: 'books',
  },
  {
    name: 'teams',
    path: '/teams',
    symbol: 'users',
  },
];

const HomeTemplate: React.FC = ({ children }) => {
  return (
    <ClayLayout.ContainerFluid>
      <ClayLayout.Row className="mt-4">
        <ClayLayout.Col size={3}>
          <ClayCard className="p-4">
            <Sidebar steps={steps} />
          </ClayCard>
        </ClayLayout.Col>
        <ClayLayout.Col size={9}>
          <ClayCard className="p-4">{children}</ClayCard>
        </ClayLayout.Col>
      </ClayLayout.Row>
    </ClayLayout.ContainerFluid>
  );
};

export default HomeTemplate;
