const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const { Sequelize, sequelize, DataTypes } = require("sequelize");
const models = require("../models");
const upload = multer({ dest: "./public/images" });

router.use(express.json());


// 검색어 저장
router.post("/search", async (req, res) => {
  const { search } = req.body; 

  try {
    const newSearch = {
      search_word: search, 
    };
    const newsearch = await models.search_log.create(newSearch);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "검색어를 저장하는 동안 오류가 발생했습니다." });
  }
});


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
    console.log(board);
    await board.save();

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

router.post("/", async (req, res) => {
  const { title, nickName, detail, price } = req.body;
  const imageUrl = req.file.filename;
  try {
    const newBoard = {
      title,
      nickName,
      detail,
      price,
      image: `${imageUrl}`,
      uploadDate: Sequelize.literal(`now()`),
      interests: "0",
      views: "0",
    };
    const newboard = await models.board.create(newBoard);

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await models.board.findAll({
      attributes: ["boardId", "title", "nickName", "price", "image", "uploadDate", "interests", "views"],
    });
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "데이터를 업데이트하는 동안 오류가 발생했습니다." });
  }
});
router.get("/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  try {
    const result = await models.board.findOne({ where: { boardId: boardId } });
    res.send(result);
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "데이터를 삭제하는 동안 오류가 발생했습니다." });
  }
});

module.exports = router;
