import ClayLayout from '@clayui/layout';
import React from 'react';

import useLang from '../../hooks/useLang';

interface Layout {
  children: React.ReactElement;
  title: string;
  className?: string;
}

const Layout: React.FC = ({ children, className }: Layout) => {
  const i18n = useLang();
  return (
    <div className={`sign__in ${className}`}>
      <ClayLayout.Row justify="start" className="signin__row">
        <ClayLayout.Col
          size={4}
          sm={6}
          lg={4}
          className="signin__col signin__main"
        >
          <ClayLayout.ContainerFluid view>
            <ClayLayout.Row justify="center">
              <ClayLayout.Col xl={8} lg={10}>
                {children}
                <div className="signin__footer">
                  <p>{i18n.get('copyright')}</p>
                  <p>{i18n.get('terms-of-use')}</p>
                </div>
              </ClayLayout.Col>
            </ClayLayout.Row>
          </ClayLayout.ContainerFluid>
        </ClayLayout.Col>
        <ClayLayout.Col className="signin__col signin__background" />
      </ClayLayout.Row>
    </div>
  );
};

export default Layout;
