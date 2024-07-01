const db = require("../../database/connection");

class InvestmentRepository {
	async store(userId, name, qtt) {
		return db().then(async (db) => {
			return await db.run(`
                INSERT INTO investments (user_id, name, qtt)
                VALUES ('${userId}', '${name}', '${qtt}')
            `);
		});
	}

	async list(userId) {
		return db().then(async (db) => {
			return await db.all(
				`
        			SELECT * FROM investments WHERE user_id = ?
                  `,
				userId,
			);
		});
	}
}

module.exports = InvestmentRepository;
