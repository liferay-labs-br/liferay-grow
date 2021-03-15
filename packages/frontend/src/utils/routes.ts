function buildRoutes(config, routes = {}, prefix = '') {
  for (const [key, pathOrConfig] of Object.entries(config)) {
    if (typeof pathOrConfig === 'string') {
      routes[key] = prefix + pathOrConfig;
    } else {
      routes[key] = prefix + pathOrConfig.path;

      buildRoutes(pathOrConfig.routes, routes, routes[key]);
    }
  }

  return routes;
}

const ROUTES: any = buildRoutes({
  AUTH: '/auth',
  HOME: '/',
  WELCOME: {
    path: '/welcome',
    routes: {
      GET_STARTED: '/get-started',
      KNOWLEDGE_GAPS: '/knowledge-gaps',
      SKILLS_DETAILS: '/skills-details',
      SUCCESS_PAGE: '/success-page',
    },
  },
});

export default ROUTES;
