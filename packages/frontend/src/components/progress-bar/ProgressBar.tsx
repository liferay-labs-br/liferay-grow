import ClayProgressBar from '@clayui/progress-bar';
import classNames from 'classnames';
import React from 'react';

type IProgressBar = {
  value: number;
};

const ProgressBar: React.FC<IProgressBar> = ({ value }) => {
  return (
    <ClayProgressBar
      className={classNames('component-progress-bar')}
      value={value}
    />
  );
};

export default ProgressBar;
