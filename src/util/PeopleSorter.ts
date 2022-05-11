
import { List } from 'linqts';
import { Couple, Person } from '../types';

export default class PeopleSorter
{
	public static generateCouples(people: Person[]): Couple[]
	{
		const unsorted = new List<Person>(people)
			.OrderBy(Math.random)
			.ToArray();
		const couples = new List<Person>(unsorted)
			.Select((person, index) => ({
				from: person,
				to: this.getNextPerson(unsorted, index)
			}))
			.ToArray();
		return couples;
	}

	private static getNextPerson(people: Person[], index: number): Person
	{
		const isLastIndex = index === people.length - 1;
		const nextIndex = isLastIndex ? 0 : index + 1;
		return people[nextIndex] as Person;
	}
}
