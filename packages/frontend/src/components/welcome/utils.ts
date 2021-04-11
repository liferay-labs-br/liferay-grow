import { NextRouter } from 'next/router';

export const getCurrentStep = (router: NextRouter): string => {
  return router.pathname.replace('/welcome/', '');
};
