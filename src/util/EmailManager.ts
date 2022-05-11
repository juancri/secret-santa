
import * as AWS from 'aws-sdk';
import { SES } from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';
import { Email } from '../types';

export default class EmailManager
{
	private ses: SES;

	public constructor(region: string)
	{
		this.ses = new AWS.SES ({ region });
	}

	public send(email: Email): Promise<any>
	{
		const destination: SES.Destination =
		{
			ToAddresses: [email.to],
			BccAddresses: email.bcc
		};

		const params: SendEmailRequest =
		{
			Source: email.from,
			Destination: destination,
			Message:
			{
				Body:
				{
					Text:
					{
						Data: email.body
					}
				},
				Subject:
				{
					Data: email.subject
				}
			}
		};
		return this.ses
			.sendEmail(params)
			.promise();
	}
}
