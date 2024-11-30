let express = require("express");

let app = express();

let path = require("path");

app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/test.html")));

app.post("/storeIt", (req, res) => res.send(req.body));

app.listen(8000, () => console.log("I am listening"));