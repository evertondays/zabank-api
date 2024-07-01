const Credentials = require("../utils/credentials");
const credentials = new Credentials();

async function AuthMiddleware(req, res, next) {
	const userId = req.headers.id;
	const token = req.headers.token;

	if (!userId || !token) {
		res
			.status(401)
			.json({ message: "Informações de autenticação não encontradas" });
		return;
	}

	const authenticated = await credentials.verifyToken(userId, token);

	if (!authenticated) {
		res.sendStatus(401);
		return;
	}

	next();
}

module.exports = AuthMiddleware;
