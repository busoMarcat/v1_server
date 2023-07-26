const express = require("express");
const router = express.Router();
const { Sequelize, DataTypes } = require("sequelize");
const models = require("../models");

router.use(express.json());


// 업데이트
router.put("/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  const { title, nickName, detail, price } = req.body;

  try {
    const board = await models.board.findOne({ where: { boardId: boardId } });
    if (!board) {
      return res.status(404).json({ error: "게시판을 찾을 수 없습니다." });
    }
    board.title = title;
    board.nickName = nickName;
    board.detail = detail;
    board.price = price;
    
    await board.save();

    res.json({ success: true });

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
    res
      .status(500)
      .json({ error: "데이터를 업데이트하는 동안 오류가 발생했습니다." });
  }
});

// 삭제
router.delete("/:boardId", async (req, res) => {
  const boardId = req.params.boardId;


  try {
    const board = await models.board.findOne({ where: { boardId: boardId } });
    if (!board) {
      return res.status(404).json({ error: "게시판을 찾을 수 없습니다." });
    }
    
    await board.destroy();

    res.json({ success: true });

  try {
    const result = await models.board.findOne({where : {boardId : boardId}})
    res.send(result);

  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "데이터를 삭제하는 동안 오류가 발생했습니다." });
  }
});

module.exports = router;