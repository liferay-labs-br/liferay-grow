import { useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import SEO from '../../components/meta';
import { authGithub } from '../../graphql/schemas';
import withPublic from '../../hocs/withPublic';
import useLang from '../../hooks/useLang';
import Layout from './_layout';

const AuthMiddleware = (): React.ReactElement => {
  const router = useRouter();
  const i18n = useLang();

  const [onAuthGithub, { loading }] = useMutation(authGithub);

  const authUserGithub = async () => {
    const urlQuery = new URLSearchParams(location.search);
    const code = urlQuery.get('code');

    if (code) {
      const {
        data: { authGithub: token },
      } = await onAuthGithub({ variables: { code } });
      Cookies.set('token', token, { expires: 1, sameSite: 'strict' });
      toast.info('Welcome, User. You ill be redirect');
      router.push('/');
    } else {
      router.push('/auth');
    }
  };

  useEffect(() => {
    authUserGithub();
  }, []);

  return (
    <Layout>
      <SEO title={i18n.sub('app-title-x', 'Auth Middleware')} />

      {loading ? (
        <div>{`${i18n.get('wait')}...`}</div>
      ) : (
        <div>{`${i18n.get('redirecting')}...`}</div>
      )}
    </Layout>
  );
};

export default withPublic(AuthMiddleware);
