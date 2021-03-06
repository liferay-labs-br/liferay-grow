import React from 'react';

import { parseCookies } from '../utils/cookie';
import { redirect } from '../utils/util';
import { WrappedComponent } from './types';

const withPublic = (
  Component: React.ComponentType<WrappedComponent>,
): React.ReactNode => {
  return class WithData extends React.Component {
    static displayName = `withPublic(${Component.displayName})`;

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
      return <Component {...this.props} />;
    }
  };
};

export default withPublic;
