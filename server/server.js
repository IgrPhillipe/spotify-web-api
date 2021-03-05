import express from 'express';
const app = express();
import 'dotenv/config'

app.get('/', (req, res) => {
  res.send('Server on');
});

app.listen(process.env.PORT || 3001, () => console.log('Server ready at http:localhost:3001'));
