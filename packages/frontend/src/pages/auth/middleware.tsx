import { useMutation } from '@apollo/client';
import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AppContext from '@/AppContext';
import LoadingWrapper from '@/components/loading';
import SEO from '@/components/meta';
import AuthTemplate from '@/components/templates/AuthTemplate';
import { authGithub } from '@/graphql/mutations';
import withPublic from '@/hocs/withPublic';
import useLang from '@/hooks/useLang';
import { Types } from '@/types';
import ROUTES from '@/utils/routes';
import { parseJwt } from '@/utils/util';

const AuthMiddleware: React.FC = () => {
  const router = useRouter();
  const i18n = useLang();

  const docs = {
    'not-a-liferay-member': {
      link:
        'https://github.com/liferay-labs-br/liferay-grow/blob/master/docs/not-a-liferay-member.md',
      message: i18n.sub('read-more-about-x', 'not-a-liferay-member'),
    },
  };

  const [onAuthGithub, { loading }] = useMutation(authGithub);
  const { dispatch } = useContext(AppContext);
  const [error, setError] = useState<string>();

  const getUserToken = async () => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');

    if (code) {
      try {
        const {
          data: { authGithub: bearer },
        } = await onAuthGithub({ variables: { code } });

        dispatch({ payload: { token: bearer }, type: Types.SET_LOGGED_USER });

        const decodedToken = parseJwt(bearer);

        toast.info(i18n.sub('welcome-x', decodedToken?.name));

        router.replace(
          decodedToken?.user?.growMap ? ROUTES.HOME : ROUTES.WELCOME,
        );
      } catch (err) {
        toast.error(i18n.get(err.message));

        setError(err.message);
      }
    } else {
      router.replace(ROUTES.AUTH);
    }
  };

  useEffect(() => {
    getUserToken();
  }, []);

  return (
    <AuthTemplate>
      <SEO title={i18n.sub('app-title-x', 'Auth Middleware')} />

      {error ? (
        <div>
          {docs[error] ? (
            <p>
              <a target="_blank" href={docs[error].link} rel="noreferrer">
                {docs[error].message}
              </a>
            </p>
          ) : (
            <p>{i18n.get(error)}</p>
          )}

          <ClayButton className="mt-4" onClick={() => router.replace('/auth')}>
            {i18n.get('try-again')}
          </ClayButton>
        </div>
      ) : loading ? (
        <LoadingWrapper />
      ) : (
        <div>{`${i18n.get('redirecting')}...`}</div>
      )}
    </AuthTemplate>
  );
};

export default withPublic(AuthMiddleware);
