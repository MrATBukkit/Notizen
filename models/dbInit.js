class DBInit {

    constructor(db) {
        this.db = db;
    }
    createNotizenTable() {
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS notizen (
                'PK' integer Primary Key AUTOINCREMENT,
                'text' varchar(200) NOT NULL);`);
        });
    }
    createTagsTable() {
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS tags (
                'PK' integer Primary Key AUTOINCREMENT,
                'tag' varchar(200) NOT NULL);`);
        })
    }
    createPivotTable() {
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS notizen_tags (
                'tag_FK' integer NOT NULL,
                'notizen_FK' integer NOT NULL,
                foreign key(tag_FK) references tags(PK),
                foreign key(notizen_FK) references notizen(PK),
                PRIMARY KEY('tag_FK', 'notizen_FK'));`);
        });
    }

    fillDatabase() {
        this.db.serialize(() => {
            this.db.run(`INSERT OR REPLACE INTO notizen ('PK', 'text') VALUES (1, 'testen'), (2, 'lernen');`);
            this.db.run(`INSERT OR REPLACE INTO tags ('PK', 'tag') VALUES (1, 'Schule'), (2, 'Privat'), (3, 'Firma');`);
            this.db.run(`INSERT or REPLACE INTO notizen_tags ('tag_FK', 'notizen_FK') VALUES (1,1), (2, 1), (2, 2);`)
        });
    }

    createDatabase() {
        this.db.serialize(() => {
            this.createTagsTable();
            this.createNotizenTable();
            this.createPivotTable();
            this.fillDatabase();
        });
    }
}
module.exports = DBInit;