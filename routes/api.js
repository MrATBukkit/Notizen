const express = require('express');
const router = express.Router();

router.route("/notes")
    .get(notizenGET);

function notizenGET(req, res) {
    db.all('SELECT * FROM notizen', [], (err, rows) => {
        if (err) {
          throw err;
        }
        res.send(rows);
        /*rows.forEach((row) => {
          console.log(row.name);
        });*/

    });
}