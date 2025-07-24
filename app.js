import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import { specs } from "./utils/swagger.js";

import { connectToMongoDB } from "./model/db.js";
import CustomNotFoundError from "./errors/customNotFoundError.js";
import CustomBadRequestError from "./errors/customBadRequestError.js";
import waitListRouter from "./routes/waitlistRouter.js";

const app = express();

await connectToMongoDB();

// Pretty print
app.set("json spaces", 2);

const allowedOrigins = [
	"https://tinkerpal.com",
	"http://localhost:5173",
	"http://localhost:3001",
];

const staticCorsOptions = {
	origin: function (origin, callback) {
		if (!origin) return callback(null, true);
		if (allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
	credentials: true,
};

app.use(cors(staticCorsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/join-waitlist", waitListRouter);

// Catch all route
app.all("/", (req, res, next) => {
	const error = new CustomNotFoundError(`Route ${req.originalUrl} not found`);
	next(error);
});

app.all("/*splat", (req, res, next) => {
	const error = new CustomNotFoundError(`Route ${req.originalUrl} not found`);
	next(error);
});

// Error handlers
app.use((err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
		return next(
			new CustomBadRequestError(
				"Invalid payload. Please check your request body format."
			)
		);
	}
	next(err);
});

app.use((err, req, res, next) => {
	console.error(err);

	let message;

	try {
		message = JSON.parse(err.message);
	} catch {
		message = err.message || "Something went wrong";
	}

	res.status(err.statusCode || 500).json({
		statusCode: err.statusCode || 500,
		name: err.name || "InternalServerError",
		message,
	});
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
