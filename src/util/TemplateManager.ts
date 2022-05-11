
// Dependencies
import * as handlebars from 'handlebars';

export default class TemplateManager<T>
{
	private template: HandlebarsTemplateDelegate<T>;

	public constructor(templateText: string)
	{
		this.template = handlebars.compile(templateText);
	}

	public generate(data: T): string
	{
		return this.template(data);
	}
}
