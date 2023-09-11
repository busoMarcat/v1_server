const express = require("express");
const router = express.Router();
const { Sequelize, sequelize, DataTypes, where } = require("sequelize");
const models = require("../models");
const upload = require("../middlewares/multers");
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const results = await models.board.findAll({
      attributes: [
        "boardId",
        "title",
        "nickName",
        "price",
        "image",
        "uploadDate",
        "interests",
        "views",
      ],
    });
    res.send(results);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "데이터를 업데이트하는 동안 오류가 발생했습니다." });
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
// 검색어 조회
router.get("/search", async (req, res) => {
  try {
    const searchLogs = await models.search_log.findAll({
      attributes: [
        "search_word",
        [Sequelize.fn("COUNT", Sequelize.col("search_word")), "count"],
      ],
      group: ["search_word"],
      order: [[Sequelize.literal("count"), "DESC"]],
      limit: 5,
    });
    res.json(searchLogs);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "검색어를 조회하는 동안 오류가 발생했습니다." });
  }
});

//좋아요 상위 3개 조회
router.get("/find", async (req, res) => {
  try {
    const rows = await models.board.findAll({
      attributes: ["title"],
      order: [["interests", "DESC"]],
      limit: 3,
    });

    res.json(rows);
  } catch (err) {
    console.error("Error executing Sequelize query:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
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
    res
      .status(500)
      .json({ error: "검색어를 저장하는 동안 오류가 발생했습니다." });
  }
});

router.post("/", async (req, res) => {
  const { title, nickName, detail, price } = req.body;
  try {
    const result = await models.board.findOne({
      attributes: [[Sequelize.literal("max(boardId)"), "boardId"]],
    });
    console.log(result);
    const maxId = result.dataValues.boardId;
    const nextId = maxId + 1;
    const newBoard = {
      title,
      nickName,
      detail,
      price,
      uploadDate: Sequelize.literal(`now()`),
      interests: "0",
      views: "0",
    };
    const newboard = await models.board.create(newBoard);
    res.json({ success: true, boardId: nextId });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
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

router.put("/image/:boardId", upload.single("image"), async (req, res) => {
  const image = req.file.filename;
  const { boardId } = req.params;
  try {
    const [result] = await models.board.findAll({
      where: { boardId },
    });
    result.image = image;
    await result.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
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
    res
      .status(500)
      .json({ error: "데이터를 삭제하는 동안 오류가 발생했습니다." });
  }
});

module.exports = router;
