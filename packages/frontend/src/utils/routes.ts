function buildRoutes(config, routes = {}, prefix = '') {
  for (const entry of Object.entries(config)) {
    const [key, pathOrConfig]: [string, any] = entry;
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
  PROFILE: '/profile',
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
