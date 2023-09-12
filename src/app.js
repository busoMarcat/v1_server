require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models");
const port = 3000;
const fs = require("fs");
const cors = require("cors");
const indexRouter = require("./routes/indexRouter");

try {
  fs.readdirSync(process.env.FILELINK);
} catch (err) {
  console.error("images 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync(process.env.FILELINK);
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true, // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
);

app.use("/api", indexRouter);
app.use("/images", express.static(process.env.FILELINK));
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공 ");
  })
  .catch(console.error);
app.listen(port, () => {
  console.log(`listening  at http://localhost:${port}`);
});
