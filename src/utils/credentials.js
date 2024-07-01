const argon2 = require("argon2");
const UserRepository = require("../repositories/UserRepository");
const crypto = require("node:crypto");

const userRepository = new UserRepository();

class Credentials {
	async hash(password) {
		return argon2.hash(password);
	}

	async verify(user, password) {
		return argon2.verify(user.password, password);
	}

	async createToken(userId) {
		const token = crypto.randomUUID();
		await userRepository.updateToken(userId, token);

		return token;
	}

	async verifyToken(userId, token) {
		const user = await userRepository.getByToken(userId, token);
		return !!user;
	}
}

module.exports = Credentials;
