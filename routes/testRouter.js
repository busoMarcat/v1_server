const express = require('express');
const router = express.Router();
const db = require('../database/database')

router.get('/', async (req, res) => {
    const sqlQuery = "SELECT * FROM user"
    try{
        sql = await db.query(sqlQuery);
        let [results] = sql;
        res.send(results);
    } catch(err){
        console.log(err);
    }
});


module.exports = router;