// Requirements
import * as AWS from 'aws-sdk';
import * as Enumerable from 'linq';
import * as handlebars from 'handlebars';
import * as jsonfile from 'jsonfile';
import * as path from 'path';
import * as winston from 'winston';

interface IPerson
{
	name: string;
	email: string;
}

interface IConfig
{
	profile: string | null;
	region: string;
	source: string;
	subject: string;
	copy: string[];
	people: IPerson[];
	message: string;
}

(async () =>
{
	try
	{
		// Config
		const config = jsonfile.readFileSync (
			path.join (__dirname, '../config.json')) as IConfig;
		const template = handlebars.compile (config.message);
		const ses = new AWS.SES ({ region: config.region });

		// Sort
		const unsorted = Enumerable.from (config.people)
			.orderBy (Math.random)
			.toArray ();
		const couples = Enumerable
			.range (0, unsorted.length)
			.select ((idx: number) => ({
				from: unsorted[idx],
				to: unsorted[idx < unsorted.length - 1 ? idx + 1 : 0]
			}))
			.toArray ();
		const destination: any = {};
		if (config.copy)
			destination.BccAddresses = config.copy;

		const promises = Enumerable
			.from (couples)
			.select ((couple: any) =>
			{
				destination.ToAddresses = [couple.from.email];
				const params = {
					Destination: destination,
					Message: {
						Body: { Text: { Data: template(couple) } },
						Subject: { Data: config.subject }
					},
					Source: config.source
				};
				return ses.sendEmail(params).promise ();
			})
			.toArray ();
		await Promise.all (promises);

	}
	catch (e)
	{
		winston.error (e);
	}
})();
