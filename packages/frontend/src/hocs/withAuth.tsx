import React from 'react';

import { parseCookies } from '../utils/cookie';
import { keys, redirect } from '../utils/util';
import { IWrappedComponentProps } from './types';

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
