import { IncomingMessage, ServerResponse } from 'http';

export type RouterHandler = (req: IncomingMessage, res: ServerResponse) => void;
export const routes: Map<string, Map<string, RouterHandler>> = new Map();

function addRoutes(method: string, path: string, handler: RouterHandler) {
  if (!routes.has(method)) {
    routes.set(method, new Map());
  }
  routes.get(method)!.set(path, handler);
}


export default addRoutes;