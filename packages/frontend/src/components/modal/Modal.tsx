import ClayModal, { useModal } from '@clayui/modal';
import React, { ReactElement } from 'react';

interface IModalProps extends React.HTMLAttributes<HTMLElement> {
  first?: ReactElement;
  last?: ReactElement;
  size?: Size;
  title?: string;
  toggle: () => void;
  visible: boolean;
}

const Modal: React.FC<IModalProps> = ({
  children,
  first,
  last,
  size,
  title,
  toggle,
  visible,
}) => {
  const { observer } = useModal({
    onClose: toggle,
  });

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
