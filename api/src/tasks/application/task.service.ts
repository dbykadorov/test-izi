import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TASK_REPOSITORY, TaskRepositoryPort } from './ports/task.repository.port';
import { TaskEntity } from '../domain/task.entity';
import { randomUUID } from 'node:crypto';

export interface CreateTaskInput {
	title: string;
	completed?: boolean;
}

export interface UpdateTaskInput {
	title?: string;
	completed?: boolean;
}

@Injectable()
export class TaskService {
	constructor(
		@Inject(TASK_REPOSITORY)
		private readonly repository: TaskRepositoryPort
	) {}

	async getAll(): Promise<TaskEntity[]> {
		return this.repository.findAll();
	}

	async create(input: CreateTaskInput): Promise<TaskEntity> {
		const task = new TaskEntity({ id: randomUUID(), title: input.title, completed: input.completed });
		return this.repository.create(task);
	}

	async update(id: string, input: UpdateTaskInput): Promise<TaskEntity> {
		const existing = await this.repository.findById(id);
		if (!existing) throw new NotFoundException('Task not found');
		if (typeof input.title === 'string') existing.title = input.title.trim();
		if (typeof input.completed === 'boolean') existing.completed = input.completed;
		return this.repository.update(existing);
	}

	async delete(id: string): Promise<void> {
		const existing = await this.repository.findById(id);
		if (!existing) throw new NotFoundException('Task not found');
		await this.repository.delete(id);
	}
}
