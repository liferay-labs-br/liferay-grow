import ClayEmptyState from '@clayui/empty-state';
import React from 'react';

import useLang from '@/hooks/useLang';

export type EmptyStateProps = {
  description?: string;
  title?: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  children,
  description,
  title,
}) => {
  const i18n = useLang();

  return (
    <ClayEmptyState
      description={description}
      imgSrc="https://clayui.com/images/success_state.gif"
      title={title || i18n.get('no-results-found')}
    >
      {children}
    </ClayEmptyState>
  );
};

export default EmptyState;
