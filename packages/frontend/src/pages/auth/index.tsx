import ClayButton from '@clayui/button';
import ClayLayout from '@clayui/layout';
import { useRouter } from 'next/router';
import React from 'react';

import SEO from '../../components/meta';
import withPublic from '../../hocs/withPublic';
import useLang from '../../hooks/useLang';
import Layout from './_layout';

const onAuthGithub = () => {
  const { NEXT_PUBLIC_GITHUB_CLIENT_ID } = process.env;
  const GITHUB_OAUTH = 'https://github.com/login/oauth/authorize';
  const SCOPE = 'users';

  window.open(
    `${GITHUB_OAUTH}?client_id=${NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=${SCOPE}`,
    '_self',
  );
};

const Auth = (): React.ReactElement => {
  const i18n = useLang();
  const router = useRouter();

  return (
    <Layout>
      <SEO title={i18n.sub('app-title-x', 'Auth')} />
      <h1>
        Engineering <br /> Grow Together
      </h1>
      <ClayLayout.Row className="mt-5">
        <ClayLayout.Col xl={12}>
          <ClayButton onClick={onAuthGithub} className="btn-block">
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

export default withPublic(Auth);
