import http, { IncomingMessage, Server, ServerResponse } from 'http';
import config from './config';

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log('Server is running...');
    if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'Hello from Node Js!',
          path: req.url,
          method: req.method,
        })
      );
    }

    if (req.url === 'api' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'Hello from API endpoint',
        })
      );
    }

    if (req.url === '/api/users' && req.method === 'POST') {
      let body = '';

      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const parsedBody = JSON.parse(body);
        const user = {
          id: parsedBody.id,
          name: parsedBody.name,
        };
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: 'User created successfully',
            user,
          })
        );
      });
    }
  }
);
server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
