const express = require("express");
const app = express();
const port = 3000;
const boardRouter = require('./routes/boardRouter');

app.use('/board', boardRouter);

app.listen(port, () => {
  console.log(`listening  at http://localhost:${port}`);
});


