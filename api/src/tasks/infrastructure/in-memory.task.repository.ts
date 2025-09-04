import { TaskRepositoryPort } from '../application/ports/task.repository.port';
import { TaskEntity } from '../domain/task.entity';

export class InMemoryTaskRepository implements TaskRepositoryPort {
	private readonly storage = new Map<string, TaskEntity>();

	async findAll(): Promise<TaskEntity[]> {
		return Array.from(this.storage.values());
	}

	async findById(id: string): Promise<TaskEntity | null> {
		return this.storage.get(id) ?? null;
	}

	async create(task: TaskEntity): Promise<TaskEntity> {
		this.storage.set(task.id, task);
		return task;
	}

	async update(task: TaskEntity): Promise<TaskEntity> {
		this.storage.set(task.id, task);
		return task;
	}

	async delete(id: string): Promise<void> {
		this.storage.delete(id);
	}
}
