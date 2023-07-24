const express = require('express'); 
const app = express();
const test = require("./routes/testRouter");
const port = 3000;

app.use("/user",test)

app.listen(port, ()=> {
console.log(`listening at http://localhost:${port}`)
})