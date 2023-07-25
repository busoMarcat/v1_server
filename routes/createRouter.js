const express = require('express');
const router = express.Router();
const db = require('../database/database');

router.use(express.json())

router.post('/', async (req, res) => {
    let {title, nickName, detail, price} = req.body;
    const sqlQuery = `insert into board(title, nickName, detail, price, uploadDate, interests, views) values('${title}', '${nickName}', '${detail}', '${price}', now(), 0, 0)`;
    try{
        sql = await db.query(sqlQuery);
        res.json({success:true});
    } catch(err){
        console.log(err);
        res.json({success:false});
    }
});

module.exports = router;