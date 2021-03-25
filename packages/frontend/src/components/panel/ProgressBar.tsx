import ClayProgressBar from '@clayui/progress-bar';
import classNames from 'classnames';
import React from 'react';

type IProgressBar = {
  partialValue: number;
};

const colors = [
  {
    color: 'blue',
    level: 1,
  },
  {
    color: 'orange',
    level: 2,
  },
  {
    color: 'red',
    level: 3,
  },
  {
    color: 'teal',
    level: 4,
  },
  {
    color: 'pink',
    level: 5,
  },
  {
    color: 'green',
    level: 6,
  },
  {
    color: 'purple',
    level: 7,
  },
];

const totalValue = 7;

const ProgressBar: React.FC<IProgressBar> = ({ partialValue }) => {
  const getPercent = () => {
    return Number(((100 * partialValue) / totalValue).toFixed(1));
  };

  const getColor = (level) => {
    return colors.find((color) => color.level === level)?.color;
  };

  return (
    <div className="panel--progress-bar">
      <ClayProgressBar
        className={classNames(getColor(partialValue))}
        value={getPercent()}
      />
    </div>
  );
};

export default ProgressBar;
