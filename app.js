const express = require("express");
const app = express();
const port = 3000;

const create = require('./routes/createRouter');
app.use('/board', create);

const read = require('./routes/readRouter');
app.use('/board', read);

app.listen(port, () => {
  console.log(`listening  at http://localhost:${port}`);
});


