import { Module } from '@nestjs/common';
import { TasksController } from './interface/tasks.controller';
import { TaskService } from './application/task.service';
import { TASK_REPOSITORY } from './application/ports/task.repository.port';
import { InMemoryTaskRepository } from './infrastructure/in-memory.task.repository';

@Module({
	controllers: [TasksController],
	providers: [
		TaskService,
		{ provide: TASK_REPOSITORY, useClass: InMemoryTaskRepository },
	],
})
export class TasksModule {}
