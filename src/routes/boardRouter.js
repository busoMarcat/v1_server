const express = require("express");
const router = express.Router();
const { Sequelize, DataTypes } = require("sequelize");
const models = require("../models");
router.use(express.json());

router.post("/", async (req, res) => {
  let { title, nickName, detail, price } = req.body;
  try {
    const newBoard = {
      title: `${title}`,
      nickName: `${nickName}`,
      detail: `${detail}`,
      price: `${price}`,
      uploadDate: Sequelize.literal("now()"),
      interests: "0",
      views: "0",
    };
    console.log(newBoard.nickName);
    const newboard = await models.board.create(newBoard);

    console.log(newboard);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await models.board.findAll({attributes: [ 'boardId', 'title', 'nickName', 'price', 'uploadDate', 'interests', 'views']});
    res.send(results);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  try {
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
