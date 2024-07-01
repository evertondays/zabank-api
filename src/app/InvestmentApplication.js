const InvestmentRepository = require("../repositories/InvestmentRepository");
const repository = new InvestmentRepository();

class InvestmentApplication {
	async create(req, res) {
		const authUserId = req.headers.id;
		await repository.store(authUserId, req.body.name, req.body.qtt);

		res.sendStatus(200);
	}

	async list(req, res) {
		const authUserId = req.headers.id;
		const list = await repository.list(authUserId);

		res.status(200).json(list);
	}
}

module.exports = InvestmentApplication;
