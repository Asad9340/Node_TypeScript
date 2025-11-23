"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("./config"));
const server = http_1.default.createServer((req, res) => {
    console.log('Server is running...');
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Hello from Node Js!',
            path: req.url,
            method: req.method,
        }));
    }
    if (req.url === 'api' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Hello from API endpoint',
        }));
    }
    if (req.url === '/api/users' && req.method === 'POST') {
        let body = { id: 0, name: '' };
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log('Received user data:', body);
        });
        const user = {
            id: body.id,
            name: body.name,
        };
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'User created successfully',
            user,
        }));
    }
});
server.listen(config_1.default.port, () => {
    console.log(`Server is running on port ${config_1.default.port}`);
});
