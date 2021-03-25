import ClayButton from '@clayui/button';
import ClayLayout from '@clayui/layout';
import React from 'react';

import SEO from '@/components/meta';
import AuthTemplate from '@/components/templates/AuthTemplate';
import withPublic from '@/hocs/withPublic';
import useLang from '@/hooks/useLang';

const GITHUB_OAUTH = 'https://github.com/login/oauth/authorize';
const GITHUB_SIGNUP = 'https://github.com/join';
const SCOPE = 'users';

const onAuthGithub = () => {
  const urlParams = new URLSearchParams();

  urlParams.append('client_id', process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID);
  urlParams.append('scope', SCOPE);

  window.open(`${GITHUB_OAUTH}?${urlParams.toString()}`, '_self');
};

const Auth = (): React.ReactElement => {
  const i18n = useLang();

  return (
    <AuthTemplate>
      <SEO title={i18n.sub('app-title-x', 'Auth')} />
      <h1>
        {i18n.get('engineering')} <br /> Grow Together
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
          <a
            target="_blank"
            rel="noreferrer"
            href={GITHUB_SIGNUP}
            className="btn-link"
          >
            {i18n.get('dont-have-a-github-account')}
          </a>
        </ClayLayout.Col>
      </ClayLayout.Row>
    </AuthTemplate>
  );
};

export default withPublic(Auth);
