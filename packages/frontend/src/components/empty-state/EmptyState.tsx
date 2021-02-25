import ClayEmptyState from '@clayui/empty-state';
import React from 'react';

interface IEmptyState {
  children?: React.ReactElement;
  description?: string;
  title?: string;
}

const EmptyState = ({
  children,
  description,
  title,
}: IEmptyState): React.ReactElement => {
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
