const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database/zabank_database.sqlite");

db.serialize(() => {
	db.run(`
    CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, email VARCHAR UNIQUE, password VARCHAR, token VARCHAR, picture INTEGER, value INTEGER, has_account INTEGER)
  `);

	db.run(`
    CREATE TABLE investments (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, name VARCHAR, qtt INTEGER)
  `);
});

db.close();
