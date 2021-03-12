import ClayLoadingIndicator from '@clayui/loading-indicator';
import React from 'react';

type ILoadingWrapperProps = {
  text?: string;
};

const LoadingWrapper: React.FC<ILoadingWrapperProps> = ({ text }) => {
  return (
    <>
      <ClayLoadingIndicator />
      {text}
    </>
  );
};

export default LoadingWrapper;
