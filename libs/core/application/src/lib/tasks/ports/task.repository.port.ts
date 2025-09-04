import { TaskEntity } from '@izi/core/domain';

export interface TaskRepositoryPort {
  findAll(): Promise<TaskEntity[]>;
  findById(id: string): Promise<TaskEntity | null>;
  create(task: TaskEntity): Promise<TaskEntity>;
  update(task: TaskEntity): Promise<TaskEntity>;
  delete(id: string): Promise<void>;
}

export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');
