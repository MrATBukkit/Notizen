const express = require('express');
const router = express.Router();
let db;

router.route("/notes")
    .get(notizenGET)
    .post(postNote);

router.route("/notes/:id")
    .get(oneNotizGET)
    .delete(NotizDELETE)
    .put(NotizPUT);

router.route("/tags")
    .get(tagsGET)
    .post(tagPOST);

router.route("/tags/search")
    .get(searchTags);

router.route("/tags/:id")
    .get(oneTagGET)
    .delete(TagDELETE)
    .put(TagPUT);

function searchTags(req, res) {
    db.all(`SELECT PK as id, tag FROM tags WHERE tag like '%${req.query.q}%';`, (err, rows) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json(rows);
    });
}

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
    // curl -X POST -H "Content-Type: application/json" localhost:3000/api/tags -d '{"abc": "hallo"}'

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
    if (req.body.tags && req.body.tags.length > 0) {
        connectTagsNotes(req.body, (err) => {
            if (err) {
                res.sendStatus(500);
                return
            }
            res.sendStatus(200);
        }, req.body.PK);
    }
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

function postNote(req, res) {
    db.run(`INSERT INTO notizen ('text') VALUES (?);`,
        [req.body.text], (err)=>{
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            connectTagsNotes(req.body, (err, id) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                } else {
                    getOneNotice(id, (err, json) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        res.json(json);
                    });
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
    });
}

function oneNotizGET(req, res) {
    if (!req.params.id) {
        res.sendStatus(400);
        return;
    }
    getOneNotice(req.params.id, (err, json) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(json);
    });
}

function getOneNotice(id, callback) {
    db.get('SELECT * FROM notizen WHERE PK = ?', [id], (err, row) => {
        if (err) {
            throw err;
        }
        if (row) {
            getTagsForNotiz(row.PK).then((tagIDs) => {
                row['tags'] = tagIDs;
                callback(null, row);
            }).catch((err) => {
                callback(err, null);
                throw err;
            });
        } else {
            callback(err, null);
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

function connectTagsNotes(json, callback, id = null) {
    db.serialize(() => {
        if (id == null) {
            console.log("searching for id");
            db.get(`SELECT last_insert_rowid() AS ID;`, [], (err, row) => {
                if (err) {
                    callback(err);
                    return;
                }
                setTagsNote(json, row.ID, (err, id) => {
                   callback(err, id);
                });
            });
        } else {
            setTagsNote(json, id, (err, id) => {
                callback(err, id);
            });
        }
    });
}

function setTagsNote(json, id, callback) {
    let sql;
    sql = `INSERT INTO notizen_tags (tag_FK, notizen_FK) VALUES `;
    if (json.tags != undefined) {
        sql = `DELETE FROM notizen_tags WHERE notizen_FK=${id}; `+ sql ;
        json.tags.forEach((tag) => {
            sql += `(${tag.PK}, ${id}),`;
        });
    } else if (json.notes != undefined) {
        sql = `DELETE FROM notizen_tags WHERE tag_FK=?`;
        sqlParams.push(id);
        json.notes.forEach((note) => {
            sql += "(?, ?)";
        });
    } else {
        callback(null, id);
        return;
    }
    sql = sql.substring(0, sql.length-1) + ";";
    let createID = id;
    db.run(sql, [], (err) => {
        if (err) {
            callback(err, null);
        }
        callback(null, createID);
    });
}

module.exports = function (dataBase) {
    db = dataBase;
    return router;
};