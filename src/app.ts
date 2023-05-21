import 'express-async-errors';
import http from 'http';
import express from 'express';
import { router } from './http/routes';

const app = express();

app.use(router);

const serverHttp = http.createServer(app);

export { app, serverHttp };
