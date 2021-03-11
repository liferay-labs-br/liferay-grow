import React from 'react';

import { parseCookies } from '../utils/cookie';
import { keys, redirect } from '../utils/util';
import { IWrappedComponentProps } from './types';

const withPublic = (
  Component: React.ComponentType<IWrappedComponentProps>,
): React.ReactNode => {
  return class WithData extends React.Component {
    static displayName = `withPublic(${Component.displayName})`;

    static async getInitialProps(ctx) {
      const { req } = ctx;
      const { [keys.token]: token } = parseCookies(req);

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
