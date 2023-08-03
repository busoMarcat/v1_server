const express = require("express");
const app = express();
const db = require("./models");
const port = 3000;
const boardRouter = require("./routes/boardRouter");
const memberRouter = require("./routes/memberRouter")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/board", boardRouter);
app.use("/signup", memberRouter);

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공 ");
  })
  .catch(console.error);
app.listen(port, () => {
  console.log(`listening  at http://localhost:${port}`);
});
