import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { authGithub } from '../../graphql/schemas';
import Layout from './_layout';

const AuthMiddleware = (): React.ReactElement => {
  const router = useRouter();
  const [onAuthGithub, { loading }] = useMutation(authGithub);

  const authUserGithub = async () => {
    const urlQuery = new URLSearchParams(location.search);
    const code = urlQuery.get('code');
    if (code) {
      await onAuthGithub({ variables: { code } });
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
      {loading ? <div>Wait...</div> : <div>Redirecting...</div>}
    </Layout>
  );
};

export default AuthMiddleware;
