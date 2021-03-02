import ClayIcon from '@clayui/icon';
import classNames from 'classnames';
import React, { useContext } from 'react';

import useLang from '../../hooks/useLang';
import { steps } from './constants';
import GapsContext from './GapsContext';
import { Types } from './reducer/main-reducer';

interface IGapItemProps extends React.HTMLAttributes<HTMLElement> {
  active?: boolean;
}

const GapItem: React.FC<IGapItemProps> = ({ active, children, onClick }) => (
  <li
    onClick={onClick}
    className={classNames('gaps__sidebar__item', {
      gaps__sidebar__active: active,
    })}
  >
    <ClayIcon
      fontSize={active ? 22 : 16}
      symbol="simple-circle"
      className="mr-4"
    />
    <span>{children}</span>
  </li>
);

const GapsSidebar: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const {
    dispatch,
    state: {
      main: { step: activeStep },
    },
  } = useContext(GapsContext);

  const i18n = useLang();

  return (
    <div className="gaps__sidebar">
      <ul>
        {steps.map((step) => (
          <GapItem
            active={step === activeStep}
            key={step}
            onClick={() => dispatch({ payload: step, type: Types.EDIT_STEP })}
          >
            {i18n.get(step)}
          </GapItem>
        ))}
      </ul>
    </div>
  );
};

export default GapsSidebar;
