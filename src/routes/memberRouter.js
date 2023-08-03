const express = require("express");
const router = express.Router();
const { Sequelize, sequelize, DataTypes } = require("sequelize");
const models = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();

const env = process.env;

const saltRounds = parseInt(env.ROUNDS);

router.use(express.json());

// 회원가입 기능
router.post("/", async (req, res) => {
  const { id, pw, nickname } = req.body;

  if (!id) {
    res.status(400).json({ error: "아이디가 없습니다" });
  } else if (!pw) {
    res.status(400).json({ eroor: "비밀번호가 없습니다" });
  } else if (!nickname) {
    res.status(400).json({ eroor: "닉네임이 없습니다" });
  }

  try {
    const hash = await bcrypt.hash(pw, saltRounds);
    await models.user.create({
      userId: id,
      password: hash,
      nickName: nickname,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
