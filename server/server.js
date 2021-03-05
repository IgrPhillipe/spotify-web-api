import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Server on');
});

app.listen(3001, () => console.log('Server ready at http:localhost:3001'));

module.exports = app;