import ClayLayout from '@clayui/layout';
import Head from 'next/head';
import React from 'react';

interface Auth {
  children: React.ReactElement;
  title: string;
  className?: string;
}

const Auth: React.FC = ({ children, className, title }: Auth) => {
  return (
    <div className={`sign__in ${className}`}>
      <Head>
        <title>Liferay | {title}</title>
      </Head>
      <ClayLayout.Row justify="start" className="signin__row">
        <ClayLayout.Col size={4} className="signin__col signin__main">
          <ClayLayout.ContainerFluid view>
            <ClayLayout.Row justify="center">
              <ClayLayout.Col xl={8} lg={10}>
                {children}
                <div className="signin__footer">
                  <p>Copyright 2021. All Rights Reserverd.</p>
                  <p>Terms of Use | Privacy Policies</p>
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

export default Auth;
