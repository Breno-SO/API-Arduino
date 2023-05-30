let bodyParser = require("body-parser");
let express = require("express");
let app = express();
let router = require("./routes/routes");
const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);
require("dayjs/locale/pt-br");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/", router);

app.listen(8686, () => {
  console.log("Servidor rodando");
});
