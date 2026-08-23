const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: process.env.BREVO_SMTP_HOST,
	port: Number(process.env.BREVO_SMTP_PORT),
	secure: false,
	auth: {
		user: process.env.BREVO_SMTP_USER,
		pass: process.env.BREVO_SMTP_KEY,
	},
});

const status = process.env.BUILD_STATUS || "UNKNOWN";

const statusEmoji = status.toLowerCase() === "succeeded" ? "✅" : "❌";

const pipelineUrl =
	`${process.env.BUILD_COLLECTION_URI}` +
	`${process.env.BUILD_PROJECT}/_build/results?buildId=${process.env.BUILD_ID}`;

async function sendEmail() {
	try {
		await transporter.sendMail({
			from: `"Allure Report" <${process.env.EMAIL_FROM}>`,
			to: process.env.EMAIL_TO,

			subject: `${statusEmoji} OpenCart Playwright Report - ${status}`,

			html: `
        <h2>OpenCart Playwright Automation Report</h2>

        <p>
          <strong>Status:</strong>
          ${statusEmoji} ${status}
        </p>

        <p>
          <strong>Pipeline:</strong>
          ${process.env.BUILD_DEFINITION_NAME}
        </p>

        <p>
          <strong>Build:</strong>
          ${process.env.BUILD_NUMBER}
        </p>

        <p>
          <a href="${pipelineUrl}">
            Open Azure DevOps Pipeline
          </a>
        </p>

        <p>
          Your Playwright and Allure reports have been generated
          and are available in the Azure DevOps pipeline.
        </p>
      `,
		});

		console.log("✅ Email sent successfully!");
	} catch (error) {
		console.error("❌ Failed to send email:");
		console.error(error);
		process.exit(1);
	}
}

sendEmail();
