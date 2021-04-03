import ClayModal from '@clayui/modal';
import React, { ReactElement } from 'react';

type Size = 'full-screen' | 'lg' | 'sm';

interface IModalProps extends React.HTMLAttributes<HTMLElement> {
  first?: ReactElement;
  last?: ReactElement;
  size?: Size;
  title?: string;
  observer: any;
  visible: boolean;
}

const Modal: React.FC<IModalProps> = ({
  children,
  first,
  last,
  observer,
  size,
  title,
  visible,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <ClayModal observer={observer} size={size}>
      <ClayModal.Header>{title}</ClayModal.Header>
      <ClayModal.Body>{children}</ClayModal.Body>
      {first || (last && <ClayModal.Footer first={first} last={last} />)}
    </ClayModal>
  );
};

export default Modal;
