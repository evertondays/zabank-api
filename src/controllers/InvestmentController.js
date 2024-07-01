const routes = require("express").Router();

const InvestmentApplication = require("../app/InvestmentApplication");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const investmentApplication = new InvestmentApplication();

routes.get("/api/investment", AuthMiddleware, investmentApplication.list);
routes.post("/api/investment", AuthMiddleware, investmentApplication.create);

module.exports = routes;
