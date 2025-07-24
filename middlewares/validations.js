import { body } from "express-validator";

export const joinWaitPayloadValidation = [
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Name is required")
		.custom((value) => {
			const blockedEmails = ["string"];
			if (blockedEmails.includes(value.toLowerCase())) {
				throw new Error("Name is required");
			}
			return true;
		}),

	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Email is invalid")
		.custom((value) => {
			const blockedEmails = ["string"];
			if (blockedEmails.includes(value.toLowerCase())) {
				throw new Error("Email is required");
			}
			return true;
		}),

	body("skills")
		.isArray({ min: 1, max: 5 })
		.withMessage("Skills must be an array with 1 to 5 items")
		.custom((skills) => {
			if (
				!skills.every(
					(skill) =>
						typeof skill === "string" &&
						skill.trim().length > 0 &&
						skill.trim().toLowerCase() !== "string"
				)
			) {
				throw new Error("Each skill must be a non-empty, valid string");
			}
			return true;
		}),

	body("about")
		.optional()
		.isString()
		.withMessage("About must be a string")
		.isLength({ max: 300 })
		.withMessage("About must be at most 300 characters long")
		.custom((value) => {
			const blockedEmails = ["string"];
			if (blockedEmails.includes(value.toLowerCase())) {
				throw new Error("About cannot be then word string");
			}
			return true;
		}),
	,
];
