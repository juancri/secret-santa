
// Dependencies

import { Email } from './types';
import ConfigurationManager from './util/ConfigurationManager';
import EmailManager from './util/EmailManager';
import PeopleSorter from './util/PeopleSorter';
import TemplateManager from './util/TemplateManager';

(async () =>
{
	try
	{
		const config = ConfigurationManager.load();
		const template = new TemplateManager(config.message);
		const emailManager = new EmailManager(config.region);
		const couples = PeopleSorter.generateCouples(config.people);
		for (const couple of couples)
		{
			const email: Email = {
				from: config.source,
				to: couple.from.email,
				subject: config.subject,
				body: template.generate(couple),
				bcc: config.copy ?? []
			};
			await emailManager.send(email);
		}

	}
	catch (e)
	{
		console.error(e);
	}
})();
