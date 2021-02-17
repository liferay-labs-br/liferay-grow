import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const AuthMiddleware = (): React.ReactElement => {
  const router = useRouter();

  useEffect(() => {
    const urlQuery = new URLSearchParams(location.search);
    const code = urlQuery.get('code');
    if (code) {
      alert('Do some request');
    } else {
      router.push('/auth');
    }
  }, []);

  return (
    <div>
        Middleware
    </div>
  );
};

export default AuthMiddleware;
