const path = require('path');
const express = require('express');
const app = express();

// console.log(path.join(__dirname, "../public"));
const staticPath = path.join(__dirname, "../public")
app.use(express.static(staticPath));

app.get('/' , (req,res) => {
    res.send("Hello From the Varad uiii uaudc")
});

app.listen(8000 , () => {
    console.log("Listening to port 8000")
});