import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

type GeneralMessageData = {
	title: string;
	body: string;
	action_button_url: string;
	action_button_text: string;
	email: string;
	subject: string;
};

const sendDynamicEmail = async (templateData: GeneralMessageData) => {
	const msg = {
		to: templateData.email,
		from: 'shoots@aplb.xyz',
		templateId: 'd-e84433efd4a348269e4d5aac86551542',
		dynamicTemplateData: {
			title: templateData.title,
			body: templateData.body,
			subject: templateData.subject,
			email: templateData.email,
			action_button_url: templateData.action_button_url,
			action_button_text: templateData.action_button_text,
		},
		subject: templateData.subject,
		hideWarnings: true,
	};

	try {
		await sgMail.send(msg);
	} catch (error: unknown) {
		console.error(error);
	}
};

export default sendDynamicEmail;
