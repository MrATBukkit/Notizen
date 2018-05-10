const sqlite3 = require('sqlite3').verbose();
const dbInit = require('./models/dbInit');
const DB_PATH = "db.sqlite3";
let db = new sqlite3.Database(DB_PATH);
DBIntigration = new dbInit(db);
DBIntigration.createDatabase();