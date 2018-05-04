const express = require('express');
const router = express.Router();
let db
router.route("/notes")
    .get(notizenGET)
    .post(postMessage);

router.route("/notes/:id")
    .get(oneNotizGET)
    .delete(NotizDELETE)
    .post(oneNotizPOST);

function oneNotizPOST() {

}

function NotizDELETE(req, res) {
    db.run(`DELETE FROM notizen WHERE PK=?`, [req.params.id], (err) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
}

function postMessage(req, res) {
    db.run(`INSERT INTO notizen ('text') VALUES (?);`,
        [req.body.text], (err)=>{
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
}

function notizenGET(req, res) {
    db.all('SELECT * FROM notizen', [], (err, rows) => {
        if (err) {
          throw err;
        }
        //res.json(rows);
        let TagPromises = [];
        for (let i = 0; i < rows.length; i++) {
            TagPromises.push(getTagsForNotiz(rows[i].PK).then((tagIDs) => {
                rows[i]['tags'] = tagIDs;
            }).catch((err) => {
                throw err;
            }));
        }

        Promise.all(TagPromises).then((results) => {
            res.json(rows);
        }, (err) => {
            throw err;
        });

        /*rows.forEach((row) => {
          console.log(row.name);
        });*/
    });
}

function oneNotizGET(req, res) {
    if (!req.params.id) {
        res.sendStatus(400);
        return;
    }
    db.get('SELECT * FROM notizen WHERE PK = ?', [req.params.id], (err, row) => {
       if (err) {
           throw err;
       }

       if (row) {
           getTagsForNotiz(row.PK).then((tagIDs) => {
               row['tags'] = tagIDs;
               res.json(row);
           }).catch((err) => {
               res.sendStatus(500);
               throw err;
           });
       } else {
           res.sendStatus(444);
       }
    });
}

function getTagsForNotiz(notizId) {
    return new Promise((resolve, reject) => {
            db.all(`SELECT tags.PK, tags.tag FROM notizen_tags 
                INNER JOIN tags 
                on notizen_tags.tag_FK = tags.PK 
                WHERE notizen_tags.notizen_FK = ?;`,
                        [notizId], (err, rows) => {
                            if (err) {
                               reject(err);
                            }
                            let arr = [];
                            rows.forEach((row) => {
                                arr.push(row.PK);
                            });
                            console.log("resolver");
                            resolve(rows);
                        }
                    );
    });
}

module.exports = function (dataBase) {
    db = dataBase;
    return router;
};