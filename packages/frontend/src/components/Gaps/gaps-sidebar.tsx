import ClayIcon from '@clayui/icon';
import classNames from 'classnames';
import React from 'react';

type GapItemProps = {
  active?: boolean;
  children: React.ReactChild;
};

const GapItem = ({ active, children }: GapItemProps) => (
  <li
    className={classNames('gaps__sidebar__item', {
      gaps__sidebar__active: active,
    })}
  >
    <div>
      <ClayIcon
        fontSize={active ? 22 : 16}
        symbol="simple-circle"
        className="mr-4"
      />
      <span>{children}</span>
    </div>
  </li>
);

export default function GapsSidebar(): React.ReactElement {
  return (
    <div className="gaps__sidebar">
      <ul>
        <GapItem active>Get Started</GapItem>
        <GapItem>Personal Details</GapItem>
        <GapItem>Skills Details</GapItem>
        <GapItem>Knowledge Gaps</GapItem>
      </ul>
    </div>
  );
}
