import ClayModal, { useModal } from '@clayui/modal';
import React, { ReactElement } from 'react';

type Size = 'full-screen' | 'lg' | 'sm';

interface ModalProps {
  children: ReactElement;
  first?: ReactElement;
  last?: ReactElement;
  title?: string;
  toggle(): void;
  visible: boolean;
  size?: Size;
}

const Modal = ({
  children,
  first,
  last,
  size,
  title,
  toggle,
  visible,
}: ModalProps): ReactElement => {
  const { observer } = useModal({
    onClose: toggle,
  });

  return (
    <>
      {visible && (
        <ClayModal observer={observer} size={size}>
          <ClayModal.Header>{title}</ClayModal.Header>
          <ClayModal.Body>{children}</ClayModal.Body>
          {first || (last && <ClayModal.Footer first={first} last={last} />)}
        </ClayModal>
      )}
    </>
  );
};

export default Modal;
