export const getCurrentStep = (router: any): string => {
  return router.pathname.replace('/welcome/', '');
};
