const express = require("express");
const app = express();
const port = 3000;

const test = require('./routes/testRouter')
app.use('/user', test);

app.listen(port, () => {
  console.log(`listening  at http://localhost:${port}`);
});
