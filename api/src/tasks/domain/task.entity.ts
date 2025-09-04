export class TaskEntity {
	readonly id: string;
	title: string;
	completed: boolean;

	constructor(params: { id: string; title: string; completed?: boolean }) {
		if (!params.title || params.title.trim().length === 0) {
			throw new Error('Task title must be non-empty');
		}
		this.id = params.id;
		this.title = params.title.trim();
		this.completed = params.completed ?? false;
	}
}
