const User = require("../models/User");
const UserRepository = require("../repositories/UserRepository");
const Credentials = require("../utils/credentials");

const repository = new UserRepository();
const credentials = new Credentials();

class UserApplication {
	async create(req, res) {
		const body = req.body;
		let user = new User(body.name, body.email, body.password);

		if (await repository.findByEmail(user.email)) {
			res.status(400).json({ message: "Email já cadastrado" });
			return;
		}

		const validation = user.validate();
		if (validation) {
			res.status(400).json({ message: validation });
		}

		user.password = await credentials.hash(user.password);
		await repository.store(user);
		user = await repository.findByEmail(user.email);

		const token = await credentials.createToken(user.id);

		res.status(201).json({ id: user.id, name: user.name, token: token });
	}

	async login(req, res) {
		const user = await repository.findByEmail(req.body.email);
		if (!user) {
			res.status(401).json({ message: "Usuário não cadastrado!" });
			return;
		}

		if (await credentials.verify(user, req.body.password)) {
			const token = await credentials.createToken(user.id);
			res.status(200).json({ id: user.id, name: user.name, token: token });
			return;
		}

		res.status(401).json({ message: "Senha incorreta!" });
	}

	async logout(req, res) {
		const authUserId = req.headers.id;
		await repository.updateToken(authUserId, null);

		res.sendStatus(200);
	}

	async myself(req, res) {
		const authUserId = req.headers.id;
		const myself = await repository.find(authUserId);

		const response = {
			id: myself.id,
			name: myself.name,
			picture: myself.picture,
			value: myself.value,
			hasAccount: myself.has_account,
		};
		res.status(200).json(response);
	}

	async deposit(req, res) {
		const authUserId = req.headers.id;
		const value = req.body.value;

		const user = await repository.find(authUserId);

		await repository.updateValue(authUserId, user.value + value);
		res.sendStatus(200);
	}

	async withdraw(req, res) {
		const authUserId = req.headers.id;
		const value = Number.parseInt(req.params.value);

		const user = await repository.find(authUserId);

		if (user.value - value < 0) {
			res.status(400).json({ message: "Saldo Insuficiente!" });
			return;
		}

		await repository.updateValue(authUserId, user.value - value);
		res.sendStatus(200);
	}

	async updatePicture(req, res) {
		const authUserId = req.headers.id;
		await repository.updatePicture(authUserId, req.params.pictureId);

		res.sendStatus(200);
	}

	async delete(req, res) {
		const authUserId = req.headers.id;
		await repository.delete(authUserId);

		res.sendStatus(200);
	}

	async createAccount(req, res) {
		const authUserId = req.headers.id;
		const myself = await repository.find(authUserId);

		if (myself.has_account === 1) {
			res.status(400).json({ message: "Você já tem conta criada" });
			return;
		}

		await repository.updateAccount(authUserId, 1);
		res.sendStatus(200);
	}

	async deleteAccount(req, res) {
		const authUserId = req.headers.id;

		await repository.updateAccount(authUserId, 0);
		await repository.updateValue(authUserId, 0);

		res.sendStatus(200);
	}
}

module.exports = UserApplication;
