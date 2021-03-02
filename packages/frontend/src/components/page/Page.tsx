import { ClayButtonWithIcon } from '@clayui/button';
import ClayLayout from '@clayui/layout';
import ClayPanel from '@clayui/panel';
import React from 'react';

interface IPage extends React.HTMLAttributes<HTMLElement> {
  addButton?: () => React.ReactNode;
  onClickBack?: () => void;
  title: string;
  withPanel?: boolean;
}

const Page: React.FC<IPage> = ({
  addButton,
  children,
  onClickBack,
  title,
  withPanel,
}) => {
  return (
    <ClayLayout.ContainerFluid className="page-component">
      <ClayLayout.Row className="header">
        <ClayLayout.Col lg={8} xl={10}>
          <div className="page-title">
            {onClickBack && (
              <ClayButtonWithIcon
                onClick={onClickBack}
                symbol="angle-left"
                displayType="unstyled"
              />
            )}
            <h1>{title}</h1>
          </div>
        </ClayLayout.Col>
        <ClayLayout.Col style={{ marginTop: -7, textAlign: 'end' }}>
          {addButton && addButton()}
        </ClayLayout.Col>
      </ClayLayout.Row>

      {withPanel ? (
        <ClayPanel className="mt-4">
          <ClayPanel.Body>{children}</ClayPanel.Body>
        </ClayPanel>
      ) : (
        children
      )}
    </ClayLayout.ContainerFluid>
  );
};

export default Page;
