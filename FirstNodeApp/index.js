let express = require("express");

let app = express();

app.get("/", (req, res) => res.send("Hello world")) // 2 parameters: a route and an arrow function
app.get('/about', (req, res) => res.send("I am the about"))

app.listen(3000, () => console.log("I am listening")) // 2 parameters: port and arrow function