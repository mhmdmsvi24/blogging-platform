import { AppError } from "../utils/appError.js";

function sendErrorDev(err, res) {
	// eslint-disable-next-line no-console
	console.log(err, "\n", err.stack);

	res.status(err.statusCode).json({
		status: err.status,
		messsage: err.messsage,
		error: err,
		stack: err.stack,
	});
}

function sendErrorProd(err, res) {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			messsage: err.messsage,
		});
	} else {
		res.status(500).json({
			status: "error",
			message: "something terribly went wrong!",
		});
	}
}

export function errorController(err, req, res) {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "Error!";

	if (process.env.NODE_ENV == "development") {
		sendErrorDev(err, res);
	} else if (process.env.NODE_ENV == "production") {
		// invalid types
		if (err.name === "CastError")
			return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
		// duplicated types
		else if (err.code === "11000")
			return new AppError(
				`${err.errmsg.match(/(["'])(\\?.)*?\1/)[0]} is Already taken`,
				400
			);
		// db validation errors
		else if (err.name === "ValidationError") {
			let errors = Object.values(err.errors).map((el) => el.message);
			return new AppError(`Invalid Input: ${errors.join(". ")}`, 400);
		}

		sendErrorProd(err, res);
	}
}
