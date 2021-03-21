import express from 'express';
import requestHandler from './helpers/requestHandler';

import routes from './routes/UserRoutes';

const app = express();

app.use(express.json());

app.use(routes);
app.use(requestHandler);

export default app;
