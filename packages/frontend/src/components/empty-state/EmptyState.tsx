import ClayEmptyState from '@clayui/empty-state';
import React, { ReactElement } from 'react';

import useLang from '@/hooks/useLang';

export type EmptyStateProps = {
  children?: ReactElement;
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
      description={description || i18n.get('sorry-there-are-no-results-found')}
      imgSrc="https://clayui.com/images/success_state.gif"
      title={title || i18n.get('no-results-found')}
    >
      {children}
    </ClayEmptyState>
  );
};

export default EmptyState;
