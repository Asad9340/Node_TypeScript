import { routes } from "./RouteHandler";

function findDynamicRoute(method: string, url: string) {
  const methodMap = routes.get(method);
  if (!methodMap) return null;
  for (const [route, handler] of methodMap.entries()) {
    const routeParts: any[] = route.split('/');
    const urlParts = url.split('/');
    if (routeParts.length !== urlParts.length) continue;

    const params: any = {};
    let isMatch = true;

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        const paramName = routeParts[i].slice(1);
        params[paramName] = urlParts[i];
      } else if (routeParts[i] !== urlParts[i]) {
        isMatch = false;
        break;
      }
    }
    if (isMatch) {
      return { handler, params };
    }
    return null;
  }
}


export default findDynamicRoute;