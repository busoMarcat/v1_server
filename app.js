const express = require('express'); 
const app = express();
const boardRouter = require("./routes/boardRouter");
const port = 3000;

app.use("/board",boardRouter)

app.listen(port, ()=> {
console.log(`listening at http://localhost:${port}`)
})