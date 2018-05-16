const DB_PATH = "db.sqlite3";
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(DB_PATH);
//const dbInit = require('./models/dbInit');


const express = require('express');
const apiRoutes = express.Router();
const app = express();
const bodyParser = require('body-parser');
const apiRouts = require('./routes/api')(db);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname+"/app/dist"));

app.listen(3000);
app.use("/api", apiRouts);