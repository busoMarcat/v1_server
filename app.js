const express = require("express");
const app = express();
const port = 3000;

const test = require('./routes/testRouter');
app.use('/user', test);

const create = require('./routes/createRouter');
app.use('/board', create);

const read = require('./routes/readRouter');
app.use('/board', read);

const detail = require('./routes/detailRouter');
app.use('/board', detail);

app.listen(port, () => {
  console.log(`listening  at http://localhost:${port}`);
});


