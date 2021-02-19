import ClayButton from '@clayui/button';
import ClayLayout from '@clayui/layout';
import { useRouter } from 'next/router';
import React from 'react';

import Layout from './_layout';

const SignIn = (): React.ReactElement => {
  const router = useRouter();

  const onSignInGithub = () => {
    const { NEXT_PUBLIC_GITHUB_CLIENT_ID } = process.env;
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=users`,
      '_self'
    );
  };

  return (
    <Layout>
      <h1>
        Engineering <br /> Grow Together
      </h1>
      <ClayLayout.Row className="mt-5">
        <ClayLayout.Col xl={12}>
          <ClayButton onClick={onSignInGithub} className="btn-block">
            Sign in with Github
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
            {"Don't have a Github account?"}
          </ClayButton>
        </ClayLayout.Col>
      </ClayLayout.Row>
    </Layout>
  );
};

export default SignIn;
