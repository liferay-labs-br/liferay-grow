import ClayEmptyState from '@clayui/empty-state';
import React from 'react';

interface IEmptyState extends React.HTMLAttributes<HTMLElement> {
  description?: string;
  title?: string;
}

const EmptyState: React.FC<IEmptyState> = ({
  children,
  description,
  title,
}) => {
  return (
    <ClayEmptyState
      description={description}
      imgSrc="https://clayui.com/images/success_state.gif"
      title={title}
    >
      {children}
    </ClayEmptyState>
  );
};

export default EmptyState;
