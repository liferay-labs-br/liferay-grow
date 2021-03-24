import ClayProgressBar from '@clayui/progress-bar';
import React from 'react';

type IProgressBar = {
  value: number;
};

const ProgressBar: React.FC<IProgressBar> = ({ value }) => {
  return <ClayProgressBar className="component-progress-bar" value={value} />;
};

export default ProgressBar;
