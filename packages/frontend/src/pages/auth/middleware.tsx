import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

import AppContext from '../../AppContext';
import SEO from '../../components/meta';
import { authGithub } from '../../graphql/mutations';
import withPublic from '../../hocs/withPublic';
import useLang from '../../hooks/useLang';
import { Types } from '../../reducers/UserReducer';
import { parseJwt } from '../../utils/util';
import Layout from './_layout';

const AuthMiddleware = (): React.ReactElement => {
  const router = useRouter();
  const i18n = useLang();

  const [onAuthGithub, { loading }] = useMutation(authGithub);
  const { dispatch } = useContext(AppContext);

  const fetchUserGithub = async () => {
    const urlQuery = new URLSearchParams(location.search);
    const code = urlQuery.get('code');

    if (code) {
      const {
        data: { authGithub: bearer },
      } = await onAuthGithub({ variables: { code } });

      dispatch({ payload: { token: bearer }, type: Types.SET_LOGGED_USER });

      const {
        name,
        user: { growMap },
      } = parseJwt(bearer);

      toast.info(i18n.sub('welcome-x', name));

      router.push(growMap ? '/' : '/welcome');
    } else {
      router.push('/auth');
    }
  };

  useEffect(() => {
    fetchUserGithub();
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
