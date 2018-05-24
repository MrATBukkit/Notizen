const express = require('express');
const router = express.Router();
let db;

router.route("/notes")
    .get(notizenGET)
    .post(postMessage);

router.route("/notes/:id")
    .get(oneNotizGET)
    .delete(NotizDELETE)
    .put(NotizPUT);

router.route("/tags")
    .get(tagsGET)
    .post(tagPOST);

router.route("/tags/:id")
    .get(oneTagGET)
    .delete(TagDELETE)
    .put(TagPUT);

function TagPUT(req, res) {
    db.run(`UPDATE tags SET tag=? WHERE PK=?`, [req.body.tagname ,req.params.id], (err) => {
        if (err) {
            res.sendStatus(500);
            return
        }
        res.sendStatus(200);
    });
    connectTagsNotes(req.body, (err) => {
       if (err) {
           res.sendStatus(500);
           return;
       }
       res.sendStatus(200);
    });
}

function TagDELETE(req, res) {
    db.run(`DELETE FROM tags WHERE PK=?`, [req.params.id], (err)  => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    })
}

function oneTagGET(req, res) {
    db.get(`SELECT tag FROM tags WHERE PK=?`, [req.params.id], (err, row) => {
       if (err) {
           res.sendStatus(500);
           return;
       }
       if (row) {
           res.json(row);
       } else {
           res.sendStatus(400)
       }
    });
}

function tagPOST(req, res) {
    if (req.body.tag != undefined) {
        db.run(`INSERT INTO tags ('tag') VALUES (?);`,
            [req.body.tag], (err) => {
                if (err) {
                    res.sendStatus(500);
                    return;
                }
            });
        connectTagsNotes(req.body, (err) => {
           if (err) {
               res.sendStatus(500);
               return;
           }
           res.sendStatus(200);
        });
    }
    // curl -X POST -H "Content-Type: application/json" localhost:3000/api/tags -d '{"abc": "hallo"}

}

function tagsGET(req, res) {
    db.all(`SELECT PK as id, tag FROM tags;`, [], (err, rows)=>{
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(rows);
    });
}

function NotizPUT(req, res) {
    db.run(`UPDATE notizen SET text=? WHERE PK=?`, [req.body.text, req.params.id], (err) => {
       if (err) {
           res.sendStatus(500);
           return;
       }
    });
    connectTagsNotes(req.body, (err) => {
       if (err) {
           res.sendStatus(500);
           return
       }
       res.sendStatus(200);
    });
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
    db.serialize(() => {
        db.run(`INSERT INTO notizen ('text') VALUES (?);`,
            [req.body.text], (err)=>{
                if (err) {
                    res.sendStatus(500);
                    return;
                }
            });
        connectTagsNotes(req.body, (err) => {
            if (err) {
                res.sendStatus(500);
                return;
            } else {
                res.sendStatus(200);
            }
        });
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
                            resolve(rows);
                        }
                    );
    });
}

function connectTagsNotes(json, callback) {
    let sql;
    let sqlParams = [];

    db.get(`SELECT last_insert_rowid() AS ID;`, [], (err, row) => {
        if (err) {
            res.sendStatus(500);
            return;
        }

        /*connectTagsNotes(row.ID, req.body, (err) => {
            if (err) {
                res.statusCode(500);
            }
            res.sendStatus(200);
        });*/

        sql = `INSERT notizen_tags (tag_FK, notizen_FK) VALUES `;
        if (json.tags != undefined) {
            json.tags.forEach((tag) => {
                sql += "(?, ?)";
                sqlParams.push(tag);
                sqlParams.push(row.ID);
            });
        }
        if (json.notes != undefined) {
            json.notes.forEach((note) => {
                sql += "(?, ?)";
                sqlParams.push(row.ID);
                sqlParams.push(note)
            });
        }
        db.run(sql, sqlParams, (err) => {
            if (err) {
                callback(err);
            }
            callback();
        });


    });
}

module.exports = function (dataBase) {
    db = dataBase;
    return router;
};