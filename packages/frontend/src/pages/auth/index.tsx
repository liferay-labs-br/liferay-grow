import ClayButton from '@clayui/button';
import ClayLayout from '@clayui/layout';
import { useRouter } from 'next/router';
import React from 'react';

import SEO from '../../components/SEO';
import useLang from '../../hooks/useLang';
import Layout from './_layout';

const SignIn = (): React.ReactElement => {
  const router = useRouter();
  const i18n = useLang();

  const onSignInGithub = () => {
    const { NEXT_PUBLIC_GITHUB_CLIENT_ID } = process.env;
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=users`,
      '_self',
    );
  };

  return (
    <Layout>
      <SEO title={i18n.sub('app-title-x', 'Auth')} />
      <h1>
        Engineering <br /> Grow Together
      </h1>
      <ClayLayout.Row className="mt-5">
        <ClayLayout.Col xl={12}>
          <ClayButton onClick={onSignInGithub} className="btn-block">
            {i18n.get('sign-in-with-github')}
          </ClayButton>
        </ClayLayout.Col>
      </ClayLayout.Row>
      <ClayLayout.Row className="signin__navigation_buttons">
        <ClayLayout.Col>
          <ClayButton
            onClick={() => router.push('/auth/signup')}
            displayType="unstyled"
            className="btn-link"
          >
            {i18n.get('dont-have-a-github-account')}
          </ClayButton>
        </ClayLayout.Col>
      </ClayLayout.Row>
    </Layout>
  );
};

export default SignIn;
