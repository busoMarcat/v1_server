const express = require("express");
const router = express.Router();
const db = require("../database/database") ;

router.get ("/", async (req, res) => {
try {
sql = await db.query("select * from user");
let [results] = sql ;
res.json(results);
} 
catch (e) {
console. log(e);
}
});
module.exports = router;