class DBInit {

    constructor(db) {
        this.db = db;
    }
    createNotizenTable() {
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS notizen (
            'PK' integer Primary Key AUTOINCREMENT,
            'text' varchar(200) NOT NULL,
            'tagFK' integer,
            foreign KEY(tagFK) references tags(PK));`);
        });
    }
    createTagsTable() {
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS tags (
            'PK' integer Primary Key AUTOINCREMENT,
            'tag' varchar(200) NOT NULL);`)
        });
    }
    createDatabase() {
        this.createTagsTable();
        this.createNotizenTable();
    }


}