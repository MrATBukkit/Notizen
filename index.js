const DB_PATH = "db.sqlite3";
const dbInit = require('./modules/dbInit');
let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(DB_PATH);
dbInit.createDB(db);