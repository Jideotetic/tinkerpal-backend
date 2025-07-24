import nodemailer from "nodemailer";

export async function sendWaitListEmail(email) {
	const transporter = nodemailer.createTransport({
		host: "smtp.zoho.com",
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	try {
		const info = await transporter.sendMail({
			from: `"TinkerPal" <${process.env.EMAIL_USER}>`,
			to: email,
			subject: "You're on the TinkerPal Waitlist",
			html: `
				<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>Thanks for joining the TinkerPal Waitlist!</h2>
				<p>Hi there,</p>
     			 <p>
        			You're officially on the list! 🙌 We're building something powerful for developers like you.
      			</p>
      			<p>
       				As we get closer to launch, you'll be among the first to get updates, early access, and special perks.
      			</p>
      			<p>Welcome aboard 🚀</p>
      			<p>Thank you,<br>The TinkerPal Team</p>
                </div>

			`,
		});

		console.log(`✅ Email successfully sent to ${email}`);
		console.log(`📬 Response: ${info.response}`);
	} catch (error) {
		console.error(`❌ Failed to send email to ${email}`);
		console.error(error);
		throw error;
	}
}
