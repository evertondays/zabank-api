const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

async function db() {
	return open({
		filename: "database/zabank_database.sqlite",
		driver: sqlite3.Database,
	});
}

module.exports = db;
