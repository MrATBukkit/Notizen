const DB_PATH = "db.sqlite3";
const dbInit = require('./models/dbInit');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(DB_PATH);

const express = require('express');
const apiRoutes = express.Router();
const app = express();
const bodyParser = require('body-parser');
const apiRouts = require('./routes/api')(db);

DBIntigration = new dbInit(db);
//DBIntigration.createDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname+"/app/dist"));

app.listen(3000);
app.use("/api", apiRouts);