function buildRoutes<T>(config: T, prefix = '') {
  let routes = {};
  for (const entry of Object.entries(config)) {
    const [key, pathOrConfig] = entry;
    if (typeof pathOrConfig === 'string') {
      routes[key] = prefix + pathOrConfig;
    } else {
      routes[key] = prefix + pathOrConfig.path;

      const nestedValue = buildRoutes(pathOrConfig.routes, routes[key]);
      routes = {
        ...routes,
        ...nestedValue,
      };
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
      SKILLS_DETAILS: '/skill-details',
      SUCCESS_PAGE: '/success-page',
    },
  },
});

export default ROUTES;
