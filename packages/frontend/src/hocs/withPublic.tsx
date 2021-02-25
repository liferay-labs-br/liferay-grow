import React from 'react';

import { parseCookies } from '../utils/cookie';
import { redirect } from '../utils/util';

const withPublic = (App: any) => {
  return class WithData extends React.Component {
    static displayName = `withPublic(${App.displayName})`;

    static async getInitialProps(ctx) {
      const { req } = ctx;
      const { token } = parseCookies(req);

      if (token) {
        redirect(ctx, '/');
      }

      return {
        token: null,
      };
    }

    render() {
      return <App {...this.props} />;
    }
  };
};

export default withPublic;
