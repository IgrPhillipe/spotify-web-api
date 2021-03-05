const express = require('express');
const app = express();

app.listen(3001, () => {
  console.log('Server ready at http:localhost:3001');
});

app.get('/', (req, res) => {
  res.send('Server on');
});