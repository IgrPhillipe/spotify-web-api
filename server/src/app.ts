import express, { Express } from 'express';
import requestHandler from './helpers/requestHandler';

import routes from './routes/index';

const app: Express = express();

app.use(express.json());

app.use(routes);
app.use(requestHandler);

export default app;
