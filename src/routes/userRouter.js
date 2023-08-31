const express = require("express");
const router = express.Router();
const { Sequelize, sequelize, DataTypes, where } = require("sequelize");
const models = require("../models");
const upload = require("../middlewares/multers");
router.use(express.json());

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await models.user.findAll({
      attributes: ["userId", "nickName"],
      where: {
        userId,
      },
    });
    if (result === "[]") {
      return res.status(404).json({ success: false });
    }
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
