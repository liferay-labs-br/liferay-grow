import ClayIcon from '@clayui/icon';
import React from 'react';

interface ICustomSelectProps extends React.HTMLAttributes<HTMLElement> {
  value?: string;
}

const CustomSelect: React.ForwardRefExoticComponent<
  ICustomSelectProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef(({ onClick, value }, forwardRef) => {
  return (
    <div
      className="form-control custom-select__content"
      onClick={onClick}
      ref={forwardRef}
      tabIndex={0}
    >
      <span>{value}</span>

      <a className="custom-select__icon">
        <ClayIcon symbol="caret-double" />
      </a>
    </div>
  );
});

export default CustomSelect;
