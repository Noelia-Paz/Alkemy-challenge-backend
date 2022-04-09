const express = require("express");
const bodyParser = require("body-parser");

const apiRouter = require("./routes/api");

const app = express();

require("./database");

app.use(bodyParser.json());
// para codificar la url
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

//arranca el servidor
app.listen(4000, () => {
  console.log("servidor conectado en el puerto 4000");
});
