import ClayEmptyState from '@clayui/empty-state';
import React from 'react';

export type EmptyStateProps = {
  description?: string;
  title?: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({
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
