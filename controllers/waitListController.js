import CustomForbiddenError from "../errors/customForbiddenError.js";
import { verifyRequestBody } from "../middlewares/guards.js";
import Contact from "../schemas/contact.js";
import { sendWaitListEmail } from "../services/emailService.js";

export const joinWaitList = async (req, res, next) => {
	try {
		verifyRequestBody(req);

		const { name, email, skills, about } = req.body;

		const existingContact = await Contact.findOne({ email });

		if (existingContact) {
			throw new CustomForbiddenError("Contact exist on wait list");
		}

		const newContact = await Contact({
			name,
			email,
			skills,
			about,
		});

		await newContact.save();

		await sendWaitListEmail(email);

		return res.status(200).json({
			statusCode: 200,
			message: "Contact added to wait list successfully",
		});
	} catch (error) {
		next(error);
	}
};
