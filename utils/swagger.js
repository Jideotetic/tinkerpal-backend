import swaggerJsdoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.1.1",
		info: {
			title: "Tinker Pal API",
			version: "1.0.0",
			description: "Tinker Pal API documentation",
		},
	},
	apis: ["./routes/**/*.js"],
};

const specs = swaggerJsdoc(options);

export { specs };
