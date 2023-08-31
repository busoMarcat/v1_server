const express = require("express");
const app = express();
const board = require("./boardRouter");

app.use("/board", board);

module.exports = app;
