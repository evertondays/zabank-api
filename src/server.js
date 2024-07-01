const port = 3333;

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("./frontend");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(require("./controllers/UserController"));
app.use(require("./controllers/InvestmentController"));

app.listen(port, () => {
	const date = new Date();
	const logDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

	console.clear();
	console.log(
		`O servidor está no ar!\n\n  + api: http://localhost:${port}\n  + front-end: http://localhost:3000\n  + criado por: Alejandro, Eloiza e Everton\n\n-> Última atualização às ${logDate}\n`,
	);
});
