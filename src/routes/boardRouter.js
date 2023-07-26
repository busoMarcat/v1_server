const express = require("express");
const router = express.Router();
const { sequelize, DataTypes } = require("sequelize");

const Board = require("../models/board");
router.use(express.json());

// 업데이트
router.put("/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  const { title, nickName, detail, price } = req.body;

  try {
    const board = await Board.findByPk(boardId);
    if (!board) {
      return res.status(404).json({ error: "게시판을 찾을 수 없습니다." });
    }
    board.title = title;
    board.nickName = nickName;
    board.detail = detail;
    board.price = price;
    
    await board.save();

    res.json({ success: true });
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
    const board = await Board.findByPk(boardId);
    if (!board) {
      return res.status(404).json({ error: "게시판을 찾을 수 없습니다." });
    }
    
    await board.destroy();

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "데이터를 삭제하는 동안 오류가 발생했습니다." });
  }
});

module.exports = router;