import ClayLoadingIndicator from '@clayui/loading-indicator';
import React from 'react';

type ILoadingWrapperProps = {
  text?: string;
};

const LoadingWrapper: React.FC<ILoadingWrapperProps> = ({ text }) => {
  return (
    <div className="mt-4">
      <ClayLoadingIndicator />
      {text}
    </div>
  );
};

export default LoadingWrapper;
