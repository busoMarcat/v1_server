const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uploadPath = path.resolve("../../public/images/");

const router = express.Router();
const { Sequelize, sequelize, DataTypes } = require("sequelize");
const models = require("../models");
const upload = multer({ dest: "./public/images" });

router.use(express.json());

router.post("/", upload.single("image"), async (req, res) => {
  console.log("Upload Path:", uploadPath);
  let { title, nickName, detail, price } = req.body;
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

    const newboard = models.board.create(newBoard);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

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

module.exports = router;
