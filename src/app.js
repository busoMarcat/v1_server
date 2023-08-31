const express = require("express");
const app = express();
const db = require("./models");
const port = 3000;
const fs = require("fs");
const indexRouter = require("./routes/indexRouter");

try {
  fs.readdirSync("/Users/mac/Documents/sideProject/v1_server/public/images");
} catch (err) {
  console.error("images 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("/Users/mac/Documents/sideProject/v1_server/public/images");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRouter);

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공 ");
  })
  .catch(console.error);
app.listen(port, () => {
  console.log(`listening  at http://localhost:${port}`);
});
