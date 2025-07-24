import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
		},
		skills: {
			type: [String],
			required: true,
		},
		about: {
			type: String,
			default: null,
		},
	},
	{ timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
