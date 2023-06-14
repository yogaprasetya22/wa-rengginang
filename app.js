const express = require("express");
const route = require("./routes/rout.wa.js");

const app = express();
express.json();

app.use("/", route);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
