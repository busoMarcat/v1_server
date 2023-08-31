require("dotenv").config();
const express = require("express");
const router = express.Router();
const models = require("../models");
const bcrypt = require("bcrypt");

const { ROUNDS } = process.env;
const saltRounds = parseInt(ROUNDS);

// 회원가입 기능
router.post("/", async (req, res) => {
  const { id, pw, nickname } = req.body;

  if (!id || !pw || !nickname) {
    return res.status(400).json({ error: "아이디 혹은 비밀번호 혹은 닉네임이 입력되지 않았습니다" });
  }

  const duplicateUser = await models.user.findOne({ where: { userId: id } });
  if (duplicateUser) {
    return res.status(400).json({ error: "이미 존재하는 아이디입니다" });
  }

  try {
    const hash = await bcrypt.hash(pw, saltRounds);
    await models.user.create({
      userId: id,
      password: hash,
      nickName: nickname,
    });
    res.status(200).send({ message: "회원 가입이 완료되었습니다" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "회원 가입에 실패하였습니다" });
  }
});

module.exports = router;
