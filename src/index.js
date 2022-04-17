const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const apiRouter = require("./routes/api");

const app = express();

require("./database");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(4000, () => {
  console.log("servidor conectado en el puerto 4000");
});
