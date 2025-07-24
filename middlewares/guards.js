import { validationResult } from "express-validator";
import CustomBadRequestError from "../errors/customBadRequestError.js";

export const verifyRequestBody = (req) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new CustomBadRequestError(JSON.stringify(errors.array()));
	}
};
