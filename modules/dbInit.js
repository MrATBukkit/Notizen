exports.createNotizenTable = function (db) {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS notizen (
            'PK' integer Primary Key AUTOINCREMENT,
            'text' varchar(200) NOT NULL,
            'tagFK' integer,
            foreign KEY(tagFK) references tags(PK));`);
    });
}

exports.createTagsTable = function (db) {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS tags (
            'PK' integer Primary Key AUTOINCREMENT,
            'tag' varchar(200) NOT NULL);`)
    });
}

exports.createDB = function(db) {
    this.createNotizenTable(db);
    this.createTagsTable(db);
}