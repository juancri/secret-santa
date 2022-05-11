
export interface Person
{
	name: string;
	email: string;
}

export interface Couple
{
	from: Person;
	to: Person;
}

export interface Email
{
	from: string;
	to: string;
	bcc: string[];
	subject: string;
	body: string;
}

export interface Config
{
	profile: string | null;
	region: string;
	source: string;
	subject: string;
	copy: string[];
	people: Person[];
	message: string;
}
