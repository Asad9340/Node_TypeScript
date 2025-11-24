import { readUsers, writeUsers } from '../helpers/fileDB';
import parseBody from '../helpers/parseBody';
import addRoutes from '../helpers/RouteHandler';
import sendJson from '../helpers/sendJson';

addRoutes('GET', '/', (req, res) => {
  sendJson(res, 200, {
    message: 'Hello from Node Js!',
    path: req.url,
    method: req.method,
  });
});

addRoutes('GET', '/api', (req, res) => {
  sendJson(res, 200, {
    message: 'Hello from API endpoint',
    path: req.url,
    method: req.method,
  });
});

addRoutes('POST', '/api/users', async (req, res) => {
  const body = await parseBody(req);
  const users = readUsers();
  const newUser = {
    id: Date.now(),
    ...body,
  };
  users.push(newUser);
  writeUsers(users);
  sendJson(res, 201, {
    message: 'User created successfully',
    user: newUser,
  });
});

addRoutes('PUT', '/api/users/:id', async (req, res) => {
  const { id } = (req as any).params;

  const body = await parseBody(req);
  const users = readUsers();
  const userId = parseInt(id);
  const userIndex = users.findIndex((user: any) => user.id === userId);
  if (userIndex === -1) {
    sendJson(res, 404, { message: 'User not found' });
    return;
  }
  const updatedUser = { ...users[userIndex], ...body };
  users[userIndex] = updatedUser;
  writeUsers(users);
  sendJson(res, 200, {
    message: 'User updated successfully',
    user: updatedUser,
  });
});

addRoutes('DELETE', '/api/users/:id', (req, res) => {
  const { id } = (req as any).params;
  const users = readUsers();
  const userId = parseInt(id);
  const userIndex = users.findIndex((user: any) => user.id === userId);
  if (userIndex === -1) {
    sendJson(res, 404, { message: 'User not found' });
    return;
  }
  users.splice(userIndex, 1);
  writeUsers(users);
  sendJson(res, 200, { message: 'User deleted successfully' });
});
