import React from 'react';

import { parseCookies } from '../utils/cookie';
import { redirect } from '../utils/util';

const withAuth = (App: any) => {
  return class WithData extends React.Component {
    static displayName = `withAuth(${App.displayName})`;

    static async getInitialProps(ctx) {
      const { req } = ctx;
      const { token } = parseCookies(req);

      if (!token) {
        redirect(ctx, '/auth');
      }

      return {
        token,
      };
    }

    render() {
      return <App {...this.props} />;
    }
  };
};

export default withAuth;
