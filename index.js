const express = require("express");
const cors = require("cors");
const model = require("./model");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static("public"));

app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}...`);
});
