const express = require('express');
const router = express.Router();
const db = require('../database/database');

router.use(express.json())

router.post('/', async (req, res) => {
    let {title, nickName, detail, price} = req.body;
    const sqlQuery = 'insert into board(title, nickName, detail, price, uploadDate, interests, views) values(?, ?, ?, ?, now(), 0, 0)';
    try{
        sql = await db.query(sqlQuery, [title, nickName, detail, price]);
        res.json({success:true});
    } catch(err){
        console.log(err);
        res.json({success:false});
    }
});

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

router.get('/:boardId', async (req, res) => {
    const boardId = req.params.boardId;
    const sqlQuery = 'select * from board where boardId = ?';
    try{
        const sql = await db.query(sqlQuery, [boardId]);
        let [result] = sql;
        res.send(result);
    } catch(err){
        console.log(err);
    }
})


module.exports = router;