import express from 'express';
import 'dotenv/config'
import routes from './routes';

const app = express();

app.use(routes);

app.listen(process.env.PORT || 3001, () => console.log('Server ready at http:localhost:3001'));
