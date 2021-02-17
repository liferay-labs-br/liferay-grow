import { ClayButtonWithIcon } from '@clayui/button';
import ClayLayout from '@clayui/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

interface Auth {
  children: React.ReactElement;
  title: string;
}

const Auth: React.FC = ({ children, title }: Auth) => {
  const router = useRouter();

  return (
    <div className="sign__in">
      <Head>
        <title>Liferay | {title}</title>
      </Head>
      <ClayLayout.Row justify="start" className="signin__row">
        <ClayLayout.Col size={6} className="signin__col signin__main">
          <ClayLayout.ContainerFluid view>
            <ClayLayout.Row justify="center">
              <ClayLayout.Col xl={8} lg={10}>
                <ClayButtonWithIcon
                  onClick={() => router.push('/auth/signin')}
                  symbol="angle-left"
                  displayType="unstyled"
                  className="signin__btn-back"
                />
                <h1>{title}</h1>
                {children}
                <div className="signin__footer">
                  <p>Copyright 2020. All Rights Reserverd.</p>
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
