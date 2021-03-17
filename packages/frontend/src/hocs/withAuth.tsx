import React from 'react';

import { IWrappedComponentProps } from '@/types';
import { parseCookies } from '@/utils/cookie';
import { keys, redirect } from '@/utils/util';

const withAuth = (
  Component: React.ComponentType<IWrappedComponentProps>,
): React.ReactNode => {
  return class WithData extends React.Component {
    static displayName = `withAuth(${Component.displayName})`;

    static async getInitialProps(ctx) {
      const { req } = ctx;
      const { [keys.token]: token } = parseCookies(req);

      if (!token) {
        redirect(ctx, '/auth');
      }

      return {
        token,
      };
    }

    render() {
      return <Component {...this.props} />;
    }
  };
};

export default withAuth;
