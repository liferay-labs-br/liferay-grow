import ClayLabel from '@clayui/label';
import ClayLayout from '@clayui/layout';
import classNames from 'classnames';
import React from 'react';

import { getServerInfo } from '@/graphql/queries';
import useLang from '@/hooks/useLang';

import WrappedSafeComponent from '../WrappedSafeComponent';

interface AuthProps {
  children: React.ReactElement;
  className?: string;
}

type ServerInfo = {
  serverInfo: {
    SERVER_NAME: string;
    SERVER_VERSION: string;
  };
};

const AuthTemplate: React.FC<AuthProps> = ({ children, className }) => {
  const i18n = useLang();

  const frontendVersion = process.env.NEXT_PUBLIC_PACKAGE_VERSION;

  return (
    <div className={classNames('sign__in', className)}>
      <WrappedSafeComponent<ServerInfo> query={getServerInfo}>
        {({ data: { serverInfo } }) => (
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
                      <hr />
                      <ClayLabel displayType="info">
                        {i18n.sub('x-version-x', [
                          'Backend',
                          serverInfo.SERVER_VERSION,
                        ])}
                      </ClayLabel>
                      <ClayLabel className="ml-1" displayType="info">
                        {i18n.sub('x-version-x', ['Frontend', frontendVersion])}
                      </ClayLabel>
                    </div>
                  </ClayLayout.Col>
                </ClayLayout.Row>
              </ClayLayout.ContainerFluid>
            </ClayLayout.Col>
            <ClayLayout.Col className="signin__col signin__background" />
          </ClayLayout.Row>
        )}
      </WrappedSafeComponent>
    </div>
  );
};

export default AuthTemplate;
