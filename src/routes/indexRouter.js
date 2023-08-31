const express = require("express");
const app = express();
const board = require("./boardRouter");
const user = require("./userRouter");
const member = require("./memberRouter");

app.use("/signup", member);
app.use("/board", board);
app.use("/user", user);

module.exports = app;
