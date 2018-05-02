const DB_PATH = "db.sqlite3";
const dbInit = require('./models/dbInit');
const sqlite3 = require('sqlite3').verbose();

const express = require('express');
const apiRoutes = express.Router();
const app = express();
const bodyParser = require('body-parser');
const apiRouts = require('./routes/api');

let db = new sqlite3.Database(DB_PATH)

DBIntigration = new DBInit(db);
DBIntigration.createDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000);
app.use("/api", apiRouts);