const express = require('express');
const router = express.Router();
let dataBase
router.route("/notes")
    .get(notizenGET);

function notizenGET(req, res) {
    dataBase.all('SELECT * FROM notizen', [], (err, rows) => {
        if (err) {
          throw err;
        }
        res.send(rows);
        /*rows.forEach((row) => {
          console.log(row.name);
        });*/
    });
}

module.exports = function (db) {
    dataBase = db;
    return router;
};