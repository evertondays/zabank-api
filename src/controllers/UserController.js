const routes = require("express").Router();

const UserApplication = require("../app/UserApplication");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const userApplication = new UserApplication();

routes.post("/api/login", userApplication.login);
routes.get("/api/myself", AuthMiddleware, userApplication.myself);
routes.delete("/api/logout", AuthMiddleware, userApplication.logout);

routes.post("/api/user", userApplication.create);
routes.put(
	"/api/user/picture/:pictureId",
	AuthMiddleware,
	userApplication.updatePicture,
);
routes.delete("/api/myself", AuthMiddleware, userApplication.delete);
routes.post("/api/user/account", AuthMiddleware, userApplication.createAccount);

routes.post("/api/user/deposit", AuthMiddleware, userApplication.deposit);
routes.put("/api/user/value/:value", AuthMiddleware, userApplication.withdraw);
routes.delete(
	"/api/user/account",
	AuthMiddleware,
	userApplication.deleteAccount,
);

module.exports = routes;
