import ClayModal from '@clayui/modal';
import React, { ReactElement } from 'react';

type Size = 'full-screen' | 'lg' | 'sm';

interface IModalProps extends React.HTMLAttributes<HTMLElement> {
  first?: ReactElement;
  last?: ReactElement;
  size?: Size;
  subtitle?: string;
  title?: string;
  observer: typeof ClayModal.defaultProps.observer;
  visible: boolean;
}

const Modal: React.FC<IModalProps> = ({
  children,
  first,
  last,
  observer,
  size,
  subtitle,
  title,
  visible,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <ClayModal observer={observer} size={size}>
      <ClayModal.Header>
        <ClayModal.Title>{title}</ClayModal.Title>
      </ClayModal.Header>
      {subtitle && (
        <ClayModal.SubtitleSection>
          <ClayModal.Subtitle className="pl-4 mt-2 pr-4 legend-text">
            {subtitle}
          </ClayModal.Subtitle>
        </ClayModal.SubtitleSection>
      )}
      <ClayModal.Body>{children}</ClayModal.Body>
      {first || (last && <ClayModal.Footer first={first} last={last} />)}
    </ClayModal>
  );
};

export default Modal;
