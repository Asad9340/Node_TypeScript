import { IncomingMessage } from 'http';

async function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body);
        resolve(parsedBody ? parsedBody : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

export default parseBody;