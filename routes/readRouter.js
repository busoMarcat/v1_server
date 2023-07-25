const express = require('express');
const router = express.Router();
const db = require('../database/database');

router.use(express.json());

router.get('/', async (req, res) => {
    const sqlQuery = 'select title, nickName, price, uploadDate, interests from board';
    try{
        sql = await db.query(sqlQuery);
        let [result] = sql;
        res.send(result);
        res.json(result);
    } catch(err){
        console.log(err);
    }
});

module.exports = router;